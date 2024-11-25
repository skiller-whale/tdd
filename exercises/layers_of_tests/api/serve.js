import router from "./router.js";
import * as dao from "./dao/dao.js";

const port = 8082;
const fetch = (request) => router(dao, request);

Bun.serve({ port, fetch });
console.log(`API server listening on port ${port}.`)
