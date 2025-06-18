import server from "../src/server.js";

server.start({ port: 3001 });
console.log(`Frontend server started on ${server.baseUrl}`);
