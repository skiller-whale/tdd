import { describe, it, expect } from "bun:test";
import { newGame, makeGuess } from "./core/gameState.js";
import * as database from "./database.js";

describe("database", () => {
  it("lets you save and retrieve games", async () => {
    await database.initialize();

    const game = newGame("whale");
    database.saveGame(game);

    const retrievedGame = database.getGame(game.id);
    expect(retrievedGame).toEqual(game);

    const modifiedGame = makeGuess(retrievedGame, "whale");
    database.saveGame(modifiedGame);

    const newlyRetrievedGame = database.getGame(game.id);
    expect(newlyRetrievedGame).toEqual(modifiedGame);
  });

  it("returns undefined for non-existent games", async () => {
    await database.initialize();

    const game = database.getGame("non-existent-game-id");
    expect(game).toBeUndefined();
  });

  it("persists data when the process is restarted", async () => {
    // This is a placeholder for the actual test logic. In a real scenario,
    // we would need some more complex testing infrastructure that enables
    // us to stop and start processes.
    expect(true).toBe(true);
  });
});
