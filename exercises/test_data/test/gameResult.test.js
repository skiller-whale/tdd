import { describe, expect, it } from "bun:test";
import { validateGameResult, summarizeGame } from "../src/gameResult.js";

describe("validateGameResult", () => {
  it("accepts a valid game result", () => {
    const result = {
      playerName: "Alice",
      answer: "whale",
      guesses: ["crane", "slate", "whale"],
      date: "2026-02-01",
    };
    expect(validateGameResult(result)).toEqual({ valid: true });
  });

  it("rejects a result that isn't an object", () => {
    const invalidResults = [null, "not an object", 42, [], () => {}];
    for (const invalidResult of invalidResults) {
      expect(validateGameResult(invalidResult)).toEqual({
        valid: false,
        reason: "Result must be an object",
      });
    }
  });

  it("rejects a result with a missing playerName", () => {
    const result = {
      answer: "whale",
      guesses: ["crane", "slate", "whale"],
      date: "2026-02-01",
    };
    expect(validateGameResult(result)).toEqual({
      valid: false,
      reason: "playerName must be a non-empty string",
    });
  });

  it("rejects a result with a missing answer", () => {
    const result = {
      playerName: "Alice",
      guesses: ["crane", "slate", "whale"],
      date: "2026-02-01",
    };
    expect(validateGameResult(result)).toEqual({
      valid: false,
      reason: "answer must be a 5-letter lowercase word",
    });
  });

  it("rejects a result with an answer of the wrong format", () => {
    const invalidAnswers = ["whales", "WHALE", "wh4le", "whal", ""];
    for (const invalidAnswer of invalidAnswers) {
      const result = {
        playerName: "Alice",
        answer: invalidAnswer,
        guesses: ["crane", "slate", "whale"],
        date: "2026-02-01",
      };
      expect(validateGameResult(result)).toEqual({
        valid: false,
        reason: "answer must be a 5-letter lowercase word",
      });
    }
  });

  it("rejects a result with missing guesses", () => {
    const result = {
      playerName: "Alice",
      answer: "whale",
      date: "2026-02-01",
    };
    expect(validateGameResult(result)).toEqual({
      valid: false,
      reason: "guesses must be a non-empty array",
    });
  });

  it("rejects a result with non-array guesses", () => {
    const result = {
      playerName: "Alice",
      answer: "whale",
      guesses: "not an array",
      date: "2026-02-01",
    };
    expect(validateGameResult(result)).toEqual({
      valid: false,
      reason: "guesses must be a non-empty array",
    });
  });

  it("rejects a result with an invalid date format", () => {
    const result = {
      playerName: "Alice",
      answer: "whale",
      guesses: ["crane", "slate", "whale"],
      date: "02-01-2026",
    };
    expect(validateGameResult(result)).toEqual({
      valid: false,
      reason: "date must be a YYYY-MM-DD string",
    });
  });

  it("rejects a result that isn't in a completed state", () => {
    const result = {
      playerName: "Alice",
      answer: "whale",
      guesses: ["crane", "slate"], // not complete (won or lost)
      date: "2026-02-01",
    };
    expect(validateGameResult(result)).toEqual({
      valid: false,
      reason: "Game must be in a completed state (won or lost)",
    });
  });
});

describe("summarizeGame", () => {
  it.each([
    { playerName: "Alice", guesses: ["whale"] },
    { playerName: "Bob", guesses: ["crane", "slate", "flint"] },
    { playerName: "Charlie", guesses: ["stilt", "plumb", "vigor", "kayak", "monks", "crane"] },
  ])(
    'formats a winning game as "Name: ANSWER n/6 ✓"',
    ({ playerName, guesses }) => {
      const answer = guesses[guesses.length - 1];
      const result = { playerName, answer, guesses, date: "2026-02-01" };
      expect(summarizeGame(result)).toBe(
        `${playerName}: ${answer.toUpperCase()} ${guesses.length}/6 ✓`
      );
    }
  );

  it.each(["Alice", "Bob", "Charlie"])(
    'formats a losing game as "%s: WHALE X/6 ✗"',
    (playerName) => {
      const result = {
        playerName,
        answer: "whale",
        guesses: ["crane", "slate", "flame", "blame", "frame", "grape"],
        date: "2026-02-01",
      };
      expect(summarizeGame(result)).toBe(`${playerName}: WHALE X/6 ✗`);
    }
  );
});
