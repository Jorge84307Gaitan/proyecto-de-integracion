import jwt from "jsonwebtoken";
import { readUsers } from "../storage/localStore.js";

export async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token requerido" });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const users = await readUsers();
    const user = users.find((item) => item.id === decoded.sub);
    if (!user) {
      return res.status(401).json({ message: "Token invalido" });
    }

    req.user = { id: user.id, name: user.name, email: user.email };
    next();
  } catch (_error) {
    res.status(401).json({ message: "No autorizado" });
  }
}
