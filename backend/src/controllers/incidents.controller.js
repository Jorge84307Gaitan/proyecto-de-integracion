import { randomUUID } from "crypto";
import { readIncidents, writeIncidents } from "../storage/localStore.js";
import {
  getCurrentDayRange,
  getCurrentWeekRange,
  getCurrentMonthRange,
  filterIncidentsByRange,
} from "../services/reports.service.js";
import { buildIncidentsPdf } from "../utils/pdfReport.js";

export async function getIncidents(_req, res, next) {
  try {
    const incidents = await readIncidents();
    incidents.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(incidents);
  } catch (error) {
    next(error);
  }
}

export async function createIncident(req, res, next) {
  try {
    const { tipo, descripcion } = req.body;
    if (!tipo || !descripcion) {
      return res.status(400).json({ message: "tipo y descripcion son requeridos" });
    }

    let imageUrl = null;
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const incidents = await readIncidents();
    const incident = {
      _id: randomUUID(),
      tipo,
      descripcion,
      imageUrl,
      createdBy: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    incidents.push(incident);
    await writeIncidents(incidents);
    res.status(201).json(incident);
  } catch (error) {
    next(error);
  }
}

export async function exportIncidentsPdf(req, res, next) {
  try {
    const period = String(req.query.period || "weekly").toLowerCase();

    let start;
    let end;
    let title = "Reporte Semanal de Incidentes";
    let slug = "semanal";

    if (period === "daily") {
      ({ start, end } = getCurrentDayRange());
      title = "Reporte Diario de Incidentes";
      slug = "diario";
    } else if (period === "monthly") {
      ({ start, end } = getCurrentMonthRange());
      title = "Reporte Mensual de Incidentes";
      slug = "mensual";
    } else {
      ({ start, end } = getCurrentWeekRange());
    }

    const incidents = await readIncidents();
    const filtered = filterIncidentsByRange(incidents, start, end);

    const pdfBuffer = await buildIncidentsPdf({
      incidents: filtered,
      start,
      end,
      title,
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="reporte-${slug}-${new Date().toISOString().slice(0, 10)}.pdf"`
    );
    res.send(pdfBuffer);
  } catch (error) {
    next(error);
  }
}
