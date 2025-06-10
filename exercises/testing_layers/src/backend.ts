import router from "./backend/router.ts";

type Options = {
  port: number;
};

export default function startBackend({ port }: Options) {
  const server = Bun.serve({ port, fetch: router });
  return { baseUrl: server.url };
}
