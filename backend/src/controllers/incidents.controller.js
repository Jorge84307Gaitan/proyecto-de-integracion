import { randomUUID } from "crypto";
import { readIncidents, writeIncidents } from "../storage/localStore.js";

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
