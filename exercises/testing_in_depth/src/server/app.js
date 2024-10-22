import fetch from "./handler.js"

const port = 3500;

Bun.serve({ port, fetch });
