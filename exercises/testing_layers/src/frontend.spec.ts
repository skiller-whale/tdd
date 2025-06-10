import { describe, it, expect } from "bun:test";
import startBackend from "./backend.ts";
import startFrontend from "./frontend.ts";
import urlForGameWithAnswer from "../tests/helpers/gameUrlForAnswer.ts";
import makeRequest from "../tests/helpers/makeRequest.ts";

describe("frontend server", () => {
  it("starts the server and responds to `/`", async () => {
    const backend = startBackend({ port: 0 });
    const frontend = startFrontend({ port: 0, backendUrl: backend.baseUrl });
    const { status, body } = await makeRequest({
      baseUrl: frontend.baseUrl,
      path: "/",
    });
    expect(body).toContain("Skiller Wordle");
    expect(status).toBe(200);
  });

  it("returns html for a game", async () => {
    const backend = startBackend({ port: 0 });
    const frontend = startFrontend({ port: 0, backendUrl: backend.baseUrl });
    const { status, body } = await makeRequest({
      baseUrl: frontend.baseUrl,
      path: urlForGameWithAnswer("whale"),
    });
    expect(body).toContain("Skiller Wordle");
    expect(status).toBe(200);
  });

  it("returns a 404 for non-existent paths", async () => {
    const backend = startBackend({ port: 0 });
    const frontend = startFrontend({ port: 0, backendUrl: backend.baseUrl });
    const { status, body } = await makeRequest({
      baseUrl: frontend.baseUrl,
      path: "/non-existent",
    });
    expect(body).toContain("Page not found");
    expect(status).toBe(404);
  });
});
