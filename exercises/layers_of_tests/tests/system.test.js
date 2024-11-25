/**
 * Tests that the API service works completely from end to end (including with the DB service).
 * These tests assume that both the DB and the API services are running.
 */
import { expect, test } from "bun:test";

// tests
test("POST `/games` returns initial game state", async () => {
  // TODO
});

test.skip("POST `/games/:id` returns updated game state", async () => {
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
  const response = await fetch(`${url}/games`, {
    method: "POST",
    body: JSON.stringify({ dictionary, answer }),
  });
  const payload = await response.json();

  return { response, payload };
};

const callMakeGuessEndpoint = async (gameId, guess) => {
  const response = await fetch(`${url}/games/${gameId}`, {
    method: "POST",
    body: JSON.stringify({ guess }),
  });
  const payload = await response.json();

  return { response, payload };
};
