import { Database } from "bun:sqlite";
import router from "./router.js";

const db = new Database("./db.sqlite");
const port = 8081;
const fetch = (request) => router(db, request);

Bun.serve({ port, fetch });
console.log(`DB server listening on port ${port}.`)
