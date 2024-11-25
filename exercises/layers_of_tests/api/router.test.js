import { afterEach, beforeAll, expect, test } from "bun:test";
import router from "./router.js";
import * as dao from "./dao/dao.mock.js";

// setup
beforeAll(async () => {
  await dao.initialiseDB();
  await dao.reset();
});
afterEach(async () => {
  await dao.reset();
});

// tests
test("POST `/games` returns initial game state", async () => {
  const { response, payload } = await callCreateGameEndpoint(["abcde", "axxxb"], "abcde");

  expect(response.status).toBe(200);
  expect(typeof payload.id).toBe("string");
  expect(payload.guesses).toEqual([]);
  expect(payload.evaluations).toEqual([]);
});

test("POST `/games/:id` returns updated game state", async () => {
  // TODO
});

// helper functions
const callCreateGameEndpoint = async (dictionary, answer) => {
  const request = new Request("http://domain/games", {
    method: "POST",
    body: JSON.stringify({ dictionary, answer }),
  });
  const response = await router(dao, request);
  const payload = await response.json();

  return { response, payload };
};

const callMakeGuessEndpoint = async (gameId, guess) => {
  const request = new Request(`http://domain/games/${gameId}`, {
    method: "POST",
    body: JSON.stringify({ guess }),
  });
  const response = await router(dao, request);
  const payload = await response.json();

  return { response, payload };
};
