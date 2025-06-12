import backend from "../src/backend.ts";
import frontend from "../src/frontend.ts";

backend.start({ port: 3000 });
console.log(`Backend server started on ${backend.baseUrl}`);

frontend.start({ port: 3001, backend: backend.client });
console.log(`Frontend server started on ${frontend.baseUrl}`);
