import { describe, it, expect } from "bun:test";
import startBackend from "./backend.ts";
import gameState from "./backend/core/gameState.ts";
import makeRequest from "../tests/helpers/makeRequest.ts";
import urlForGameWithAnswer from "../tests/helpers/gameUrlForAnswer.ts";

describe("backend server", () => {
  it("starts the server and responds to `/`", async () => {
    const server = startBackend({ port: 0 });
    const { status, body } = await makeRequest({
      baseUrl: server.baseUrl,
      path: "/",
    });
    expect(body).toEqual({ status: "ok" });
    expect(status).toBe(200);
  });

  it("exposes game state endpoint", async () => {
    const server = startBackend({ port: 0 });
    const answer = "whale";
    const guesses = ["fishy", "shark", "shell", "trout", "salty", "whale"];
    const { status, body } = await makeRequest({
      baseUrl: server.baseUrl,
      path: `${urlForGameWithAnswer(answer)}/state`,
      requestBody: { guesses },
    });
    expect(body).toEqual(gameState(answer, guesses));
    expect(status).toBe(200);
  });

  it.todo("exposes guess evaluations endpoint");

  it.todo("exposes guess validation endpoint");

  it("returns a 404 for non-existent paths", async () => {
    const server = startBackend({ port: 0 });
    const { status, body } = await makeRequest({
      baseUrl: server.baseUrl,
      path: "/non-existent",
    });
    expect(body).toEqual({ error: "Not Found" });
    expect(status).toBe(404);
  });
});
