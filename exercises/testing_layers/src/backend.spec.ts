import { beforeAll, describe, expect, it } from "bun:test";
import backend from "./backend.ts";

describe("backend server", () => {
  beforeAll(() => {
    backend.start({ port: 0 });
  });

  it("exposes game state endpoint", async () => {
    const { client } = backend;
    const guesses = ["whale"];
    const { response, data } = await client.post("/state", { guesses });
    expect(data).toEqual({ status: "won" });
    expect(response.status).toBe(200);
  });

  // for exercise 1 (inside-out):
  it.todo("exposes guess evaluations endpoint");

  // for exercise 3 (double loop):
  // EITHER write one test here and then step down second time:
  it.todo("exposes guess validation endpoint");

  // OR stay at this level to manage all cases:
  it.todo("exposes guess validation endpoint that invalidates guesses that are too short");

  it.todo("exposes guess validation endpoint that invalidates guesses that are too long");

  it.todo("exposes guess validation endpoint that invalidates guesses that are not in the dictionary");
});
