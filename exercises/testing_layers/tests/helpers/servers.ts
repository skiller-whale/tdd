import startBackend from "../../src/backend.ts";
import startFrontend from "../../src/frontend.ts";

export default function startServers() {
  const backendServer = startBackend({ port: 0 });
  const frontendServer = startFrontend({
    port: 0,
    backendUrl: backendServer.baseUrl,
  });

  return frontendServer;
}
