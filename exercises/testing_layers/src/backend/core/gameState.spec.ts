import { describe, it, expect } from "bun:test";
import gameState from "./gameState.ts";

describe("game state", () => {
  it("returns the game status", () => {
    const guesses1: string[] = [];
    const game1 = gameState("whale", guesses1);
    expect(game1.status).toBe("playing");

    const guesses2 = ["fishy", "shark", "shell", "trout", "salty"];
    const game2 = gameState("whale", guesses2);
    expect(game2.status).toBe("playing");

    const guesses3 = ["fishy", "shark", "shell", "whale"];
    const game3 = gameState("whale", guesses3);
    expect(game3.status).toBe("won");

    const guesses4 = ["fishy", "shark", "shell", "trout", "salty", "ocean"];
    const game4 = gameState("whale", guesses4);
    expect(game4.status).toBe("lost");
  });

  it("returns the correct answer when the game is lost", () => {
    const guesses1: string[] = [];
    const game1 = gameState("whale", guesses1);
    expect(game1.correctAnswer).toBeUndefined();

    const guesses2 = ["fishy"];
    const game2 = gameState("whale", guesses2);
    expect(game2.correctAnswer).toBeUndefined();

    const guesses3 = ["fishy", "shark", "shell", "trout", "salty"];
    const game3 = gameState("whale", guesses3);
    expect(game3.correctAnswer).toBeUndefined();

    const guesses4 = ["fishy", "shark", "shell", "whale"];
    const game4 = gameState("whale", guesses4);
    expect(game4.correctAnswer).toBeUndefined();

    const guesses5 = ["fishy", "shark", "shell", "trout", "salty", "ocean"];
    const game5 = gameState("whale", guesses5);
    expect(game5.correctAnswer).toBe("whale");
  });
});
