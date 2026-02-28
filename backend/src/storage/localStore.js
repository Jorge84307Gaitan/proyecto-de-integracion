import fs from "fs/promises";
import path from "path";

const dataDir = path.resolve(process.cwd(), "data");
const usersFile = path.join(dataDir, "users.json");
const incidentsFile = path.join(dataDir, "incidents.json");

async function ensureFile(filePath) {
  try {
    await fs.access(filePath);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(filePath, "[]", "utf8");
  }
}

async function readJson(filePath) {
  await ensureFile(filePath);
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw || "[]");
}

async function writeJson(filePath, payload) {
  await ensureFile(filePath);
  await fs.writeFile(filePath, JSON.stringify(payload, null, 2), "utf8");
}

export async function readUsers() {
  return readJson(usersFile);
}

export async function writeUsers(users) {
  return writeJson(usersFile, users);
}

export async function readIncidents() {
  return readJson(incidentsFile);
}

export async function writeIncidents(incidents) {
  return writeJson(incidentsFile, incidents);
}
