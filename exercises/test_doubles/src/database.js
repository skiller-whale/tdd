import { Database } from "bun:sqlite";
import delay from "../lib/delay.js";

const db = new Database("./games.db");

export async function initialize() {
  // pretend this takes 1 second to intialise ...
  await delay(1000);

  // create the games table if it doesn't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS games (
      id TEXT PRIMARY KEY,
      json TEXT NOT NULL
    );
  `);
}

export function getGame(id) {
  const stmt = db.prepare("SELECT json FROM games WHERE id = ?");
  const game = stmt.get(id);
  return game ? { id, ...JSON.parse(game.json) } : undefined;
}

export function saveGame({ id, ...json }) {
  const stmt = db.prepare(
    "INSERT INTO games (id, json) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET json = ?"
  );
  stmt.run(id, JSON.stringify(json), JSON.stringify(json));
}
