import express from "express";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/auth.routes.js";
import incidentsRoutes from "./routes/incidents.routes.js";
import { errorHandler, notFoundHandler } from "./middlewares/error.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL?.split(",") || "*",
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.resolve(process.cwd(), "uploads")));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "urban-eye-backend" });
});

app.use("/api/auth", authRoutes);
app.use("/api/incidents", incidentsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
