import { Router } from "express";
import {
  createIncident,
  getIncidents,
  exportIncidentsPdf,
} from "../controllers/incidents.controller.js";
import { requireAuth } from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

const router = Router();

router.get("/", getIncidents);
router.post("/", requireAuth, upload.single("image"), createIncident);
router.get("/export.pdf", requireAuth, exportIncidentsPdf);

export default router;
