import { describe, expect, it } from "bun:test";
import { calculatePlayerStats } from "../src/playerStats.js";

describe("totals", () => {
  it("returns 0s for an empty array", () => {
    const stats = calculatePlayerStats([]);
    expect(stats.gamesPlayed).toBe(0);
    expect(stats.gamesWon).toBe(0);
  });

  it("counts games played and won correctly", () => {
    const games = [
      {
        playerName: "Alice",
        answer: "whale",
        guesses: ["whale"],
        date: "2026-02-01",
      },
      {
        playerName: "Alice",
        answer: "crane",
        guesses: ["stilt", "plumb", "vigor", "kayak", "monks", "brand"],
        date: "2026-02-02",
      },
    ];
    const stats = calculatePlayerStats(games);
    expect(stats.gamesPlayed).toBe(2);
    expect(stats.gamesWon).toBe(1);
  });
});

describe("win rate", () => {
  it("returns 1 when all games are won", () => {
    const games = [
      {
        playerName: "Alice",
        answer: "whale",
        guesses: ["whale"],
        date: "2026-02-01",
      },
      {
        playerName: "Alice",
        answer: "crane",
        guesses: ["crane"],
        date: "2026-02-02",
      },
    ];
    const stats = calculatePlayerStats(games);
    expect(stats.winRate).toBe(1);
  });

  it("returns the correct ratio for a mix of wins and losses", () => {
    const games = [
      {
        playerName: "Alice",
        answer: "whale",
        guesses: ["whale"],
        date: "2026-02-01",
      },
      {
        playerName: "Alice",
        answer: "crane",
        guesses: ["stilt", "plumb", "vigor", "kayak", "monks", "brand"],
        date: "2026-02-02",
      },
      {
        playerName: "Alice",
        answer: "flint",
        guesses: ["flint"],
        date: "2026-02-03",
      },
    ];
    const stats = calculatePlayerStats(games);
    expect(stats.winRate).toBeCloseTo(2 / 3);
  });
});

describe("average attempts", () => {
  it("returns 0 when there are no wins", () => {
    const games = [
      {
        playerName: "Alice",
        answer: "whale",
        guesses: ["stilt", "plumb", "vigor", "kayak", "monks", "brand"],
        date: "2026-02-01",
      },
    ];
    const stats = calculatePlayerStats(games);
    expect(stats.averageAttempts).toBe(0);
  });

  it("calculates the mean attempts for winning games", () => {
    const games = [
      {
        playerName: "Alice",
        answer: "whale",
        guesses: ["crane", "slate", "whale"],
        date: "2026-02-01",
      },
      {
        playerName: "Alice",
        answer: "crane",
        guesses: ["stilt", "plumb", "vigor", "kayak", "monks", "brand"],
        date: "2026-02-02",
      },
      {
        playerName: "Alice",
        answer: "flint",
        guesses: ["flint"],
        date: "2026-02-03",
      },
    ];
    const stats = calculatePlayerStats(games);
    expect(stats.averageAttempts).toBe((3 + 1) / 2);
  });

  it("ignores lost games when calculating the average", () => {
    const games = [
      {
        playerName: "Alice",
        answer: "whale",
        guesses: ["stilt", "plumb", "vigor", "kayak", "monks", "brand"],
        date: "2026-02-01",
      },
    ];
    const stats = calculatePlayerStats(games);
    expect(stats.averageAttempts).toBe(0);
  });
});
