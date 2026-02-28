import { Router } from "express";
import { createIncident, getIncidents } from "../controllers/incidents.controller.js";
import { requireAuth } from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

const router = Router();

router.get("/", getIncidents);
router.post("/", requireAuth, upload.single("image"), createIncident);

export default router;
