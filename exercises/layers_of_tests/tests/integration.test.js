/**
 * Tests that the API service's DAO integrates correctly with the DB service.
 * These tests assume that the DB service is running.
 */
import { afterEach, beforeAll, expect, test } from "bun:test";
import * as dao from "../api/dao/dao.js";
import { createGame, makeGuess } from "../api/wordle/wordle.js";

beforeAll(async () => {
  await dao.initialiseDB();
  await dao.reset();
});
afterEach(async () => {
  await dao.reset();
});

// exercise 2, step 1 - read this test
test("`createGame` returns the game with its ID", async () => {
  const game = createGame(["abcde", "axxxb"], "abcde");
  const createdGame = await dao.createGame(game);
  expect(typeof createdGame.id).toBe("string");
  expect(createdGame).toEqual({ ...game, id: createdGame.id });
});

// exercise 6, step 5 - unskip the two tests below
test.skip("`getGame` returns the game", async () => {
  const game = createGame(["abcde", "axxxb"], "abcde");
  const createdGame = await dao.createGame(game);
  const retrievedGame = await dao.getGame(createdGame.id);
  expect(retrievedGame).toEqual(createdGame);
});

test.skip("`updateGame` updates the game", async () => {
  const game1 = createGame(["abcde", "axxxb"], "abcde");
  const createdGame = await dao.createGame(game1);
  const game2 = makeGuess(createdGame, "axxxb");
  await dao.updateGame(game2);
  const refreshedGame = await dao.getGame(createdGame.id);
  expect(refreshedGame).toEqual(game2);
});
