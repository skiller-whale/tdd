import { configureBaseUrl } from "./frontend/client.ts";
import router from "./frontend/router.ts";

type Options = {
  port: number;
  backendUrl: URL;
};

export default function startFrontend({ port, backendUrl }: Options) {
  const server = Bun.serve({ port, fetch: router });
  configureBaseUrl(backendUrl);
  return { baseUrl: server.url };
}
