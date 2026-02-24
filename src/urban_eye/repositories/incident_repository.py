import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).resolve().parents[3] / "data" / "urban_eye.db"


def get_connection():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    return sqlite3.connect(DB_PATH)


def init_db() -> None:
    with get_connection() as conn:
        cur = conn.execute("PRAGMA table_info(incidents)")
        cols = [row[1] for row in cur.fetchall()]

        if cols and ("tipo" not in cols or "descripcion" not in cols):
            conn.execute("DROP TABLE incidents")

        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS incidents (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                tipo TEXT NOT NULL,
                descripcion TEXT,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
            """
        )


def save_incident(tipo: str, descripcion: str) -> None:
    with get_connection() as conn:
        conn.execute(
            "INSERT INTO incidents (tipo, descripcion) VALUES (?, ?)",
            (tipo, descripcion),
        )


def list_incidents():
    with get_connection() as conn:
        cur = conn.execute(
            "SELECT id, tipo, descripcion, created_at FROM incidents ORDER BY id DESC"
        )
        return cur.fetchall()
