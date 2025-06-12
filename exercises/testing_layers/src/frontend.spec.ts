import { beforeAll, describe, it, expect } from "bun:test";
import backend from "./backend.ts";
import frontend from "./frontend.ts";

describe("frontend server", () => {
  beforeAll(() => {
    backend.start({ port: 0 });
    frontend.start({ port: 0, backend: backend.client });
  });

  it("returns html for a game", async () => {
    const { client } = frontend;
    const { response, body } = await client.get("/");
    expect(body).toContain("<h1>Skiller Wordle</h1>");
    expect(response.status).toBe(200);
  });
});
