import server from "../src/server.js";
import * as database from "../src/database.js";

await database.initialize();
server.start({ port: 3001, database });
console.log(`Frontend server started on ${server.baseUrl}`);
