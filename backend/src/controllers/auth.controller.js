import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { readUsers, writeUsers } from "../storage/localStore.js";
import generateToken from "../utils/generateToken.js";

function buildAuthResponse(user) {
  const token = generateToken({ sub: user.id, email: user.email });
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
}

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "name, email y password son requeridos" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password minimo de 6 caracteres" });
    }

    const users = await readUsers();
    const exists = users.find((item) => item.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return res.status(409).json({ message: "El email ya esta registrado" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
      id: randomUUID(),
      name,
      email: email.toLowerCase(),
      passwordHash,
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    await writeUsers(users);
    return res.status(201).json(buildAuthResponse(user));
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "email y password son requeridos" });
    }

    const users = await readUsers();
    const user = users.find((item) => item.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(401).json({ message: "Credenciales invalidas" });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ message: "Credenciales invalidas" });
    }

    return res.json(buildAuthResponse(user));
  } catch (error) {
    next(error);
  }
}
