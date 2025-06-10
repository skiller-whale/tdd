#!/usr/bin/env bun

import startBackend from "../src/backend.ts";
import startFrontend from "../src/frontend.ts";

const backend = startBackend({ port: 3000 });
console.log(`Backend server started on ${backend.baseUrl}`);

const frontend = startFrontend({ port: 3001, backendUrl: backend.baseUrl });
console.log(`Frontend server started on ${frontend.baseUrl}`);
