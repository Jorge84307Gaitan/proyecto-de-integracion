export function notFoundHandler(_req, res) {
  res.status(404).json({ message: "Ruta no encontrada" });
}

export function errorHandler(error, _req, res, _next) {
  const status = error.status || 500;
  res.status(status).json({
    message: error.message || "Error interno del servidor",
  });
}
