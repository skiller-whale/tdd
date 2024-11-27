/**
 * Tests that the API service works completely from end to end (including with the DB service).
 * These tests assume that both the DB and the API services are running.
 */
import { expect, test } from "bun:test";

// tests
test("POST `/games` returns initial game state", async () => {
  // exercise 3, step 1 - paste the code from `api/router.test.js` in here
});

// exercise 5, step 1 - unskip this test
test.skip("POST `/games/:id` returns updated game state", async () => {
  // exercise 6, step 1 - copy this code and paste it into `api/router.test.js`
  const { payload: { id } } = await callCreateGameEndpoint(["abcde", "axxxb"], "abcde");
  const { response, payload } = await callMakeGuessEndpoint(id, "axxxb");

  expect(response.status).toBe(200);
  expect(payload).toEqual({
    id,
    guesses: ["axxxb"],
    evaluations: ["g---o"],
  });
});

// helper functions
const url = "http://localhost:8082";

const callCreateGameEndpoint = async (dictionary, answer) => {
  // send a real HTTP request and wait for the response
  const response = await fetch(`${url}/games`, {
    method: "POST",
    body: JSON.stringify({ dictionary, answer }),
  });

  // parse the response body as JSON
  const payload = await response.json();

  // return the response and the payload
  return { response, payload };
};

const callMakeGuessEndpoint = async (gameId, guess) => {
  // send a real HTTP request and wait for the response
  const response = await fetch(`${url}/games/${gameId}`, {
    method: "POST",
    body: JSON.stringify({ guess }),
  });

  // parse the response body as JSON
  const payload = await response.json();

  // return the response and the payload
  return { response, payload };
};
