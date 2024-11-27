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
// exercise 1, step 1 - read this test
test("POST `/games` returns initial game state", async () => {
  // exercise 3, step 1 - copy this code and paste it into `tests/system.test.js`
  const { response, payload } = await callCreateGameEndpoint(["abcde", "axxxb"], "abcde");

  expect(response.status).toBe(200);
  expect(typeof payload.id).toBe("string");
  expect(payload.guesses).toEqual([]);
  expect(payload.evaluations).toEqual([]);
});

test("POST `/games/:id` returns updated game state", async () => {
  // exercise 6, step 1 - paste the code from `tests/system.test.js` in here
});

// helper functions
const callCreateGameEndpoint = async (dictionary, answer) => {
  // create an HTTP request (in memory)
  const request = new Request("http://domain/games", {
    method: "POST",
    body: JSON.stringify({ dictionary, answer }),
  });

  // call the `router` function with that request
  const response = await router(dao, request);

  // parse the body of the returned response as JSON
  const payload = await response.json();

  // return the response and the parsed response body
  return { response, payload };
};

const callMakeGuessEndpoint = async (gameId, guess) => {
  // create an HTTP request (in memory)
  const request = new Request(`http://domain/games/${gameId}`, {
    method: "POST",
    body: JSON.stringify({ guess }),
  });

  // call the `router` function with that request
  const response = await router(dao, request);

  // parse the body of the returned response as JSON
  const payload = await response.json();

  // return the response and the parsed response body
  return { response, payload };
};
