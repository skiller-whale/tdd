import { describe, expect, it } from "bun:test";
import { generatePlayerReport } from "./report.js";

describe("generatePlayerReport", () => {
  it("includes the player's display name as a header", () => {
    const playerStats = {
      playerId: "123",
      email: "test@example.com",
      playerName: "TestPlayer",
      gamesPlayed: 50,
      gamesWon: 25,
      winRate: 0.5,
      averageAttempts: 3.5,
      fastestWin: 2,
      firstPlayed: "2024-01-01",
      lastPlayed: "2024-06-01",
      rank: 10,
      percentile: 90,
      achievements: [],
    };

    const report = generatePlayerReport(playerStats);
    expect(report).toContain("=== TestPlayer ===");
  });

  it("includes the player's ID and email", () => {
    const playerStats = {
      playerId: "123",
      email: "test@example.com",
      playerName: "TestPlayer",
      gamesPlayed: 50,
      gamesWon: 25,
      winRate: 0.5,
      averageAttempts: 3.5,
      fastestWin: 2,
      firstPlayed: "2024-01-01",
      lastPlayed: "2024-06-01",
      rank: 10,
      percentile: 90,
      achievements: [],
    };

    const report = generatePlayerReport(playerStats);
    expect(report).toContain("ID: 123");
    expect(report).toContain("Email: test@example.com");
  });

  it("includes a stats section with games played and win rate", () => {
    const playerStats = {
      playerId: "123",
      email: "test@example.com",
      playerName: "TestPlayer",
      gamesPlayed: 50,
      gamesWon: 25,
      winRate: 0.5,
      averageAttempts: 3.5,
      fastestWin: 2,
      firstPlayed: "2024-01-01",
      lastPlayed: "2024-06-01",
      rank: 10,
      percentile: 90,
      achievements: [],
    };

    const report = generatePlayerReport(playerStats);
    expect(report).toContain("--- Stats ---");
    expect(report).toContain("Games Played: 50");
    expect(report).toContain("Games Won: 25");
    expect(report).toContain("Win Rate: 50.0%");
  });

  it("includes a performance section with average attempts and fastest win", () => {
    const playerStats = {
      playerId: "123",
      email: "test@example.com",
      playerName: "TestPlayer",
      gamesPlayed: 50,
      gamesWon: 25,
      winRate: 0.5,
      averageAttempts: 3.5,
      fastestWin: 2,
      firstPlayed: "2024-01-01",
      lastPlayed: "2024-06-01",
      rank: 10,
      percentile: 90,
      achievements: [],
    };

    const report = generatePlayerReport(playerStats);
    expect(report).toContain("--- Performance ---");
    expect(report).toContain("Average Attempts: 3.5");
    expect(report).toContain("Fastest Win: 2 guess(es)");
  });

  it("includes an activity section with first and last played dates", () => {
    const playerStats = {
      playerId: "123",
      email: "test@example.com",
      playerName: "TestPlayer",
      gamesPlayed: 50,
      gamesWon: 25,
      winRate: 0.5,
      averageAttempts: 3.5,
      fastestWin: 2,
      firstPlayed: "2024-01-01",
      lastPlayed: "2024-06-01",
      rank: 10,
      percentile: 90,
      achievements: [],
    };

    const report = generatePlayerReport(playerStats);
    expect(report).toContain("--- Activity ---");
    expect(report).toContain("First Played: 2024-01-01");
    expect(report).toContain("Last Played: 2024-06-01");
  });

  it("includes a ranking section with rank and percentile", () => {
    const playerStats = {
      playerId: "123",
      email: "test@example.com",
      playerName: "TestPlayer",
      gamesPlayed: 50,
      gamesWon: 25,
      winRate: 0.5,
      averageAttempts: 3.5,
      fastestWin: 2,
      firstPlayed: "2024-01-01",
      lastPlayed: "2024-06-01",
      rank: 10,
      percentile: 90,
      achievements: [],
    };

    const report = generatePlayerReport(playerStats);
    expect(report).toContain("--- Ranking ---");
    expect(report).toContain("Rank: #10");
    expect(report).toContain("Percentile: Top 90%");
  });

  it("includes an achievements section", () => {
    const playerStats = {
      playerId: "123",
      email: "test@example.com",
      playerName: "TestPlayer",
      gamesPlayed: 50,
      gamesWon: 25,
      winRate: 0.5,
      averageAttempts: 3.5,
      fastestWin: 2,
      firstPlayed: "2024-01-01",
      lastPlayed: "2024-06-01",
      rank: 10,
      percentile: 90,
      achievements: [],
    };

    const report = generatePlayerReport(playerStats);
    expect(report).toContain("--- Achievements ---");
    expect(report).toContain("No achievements yet.");
  });

  it("formats each achievement with a trophy emoji", () => {
    const playerStats = {
      playerId: "123",
      email: "test@example.com",
      playerName: "TestPlayer",
      gamesPlayed: 50,
      gamesWon: 25,
      winRate: 0.5,
      averageAttempts: 3.5,
      fastestWin: 2,
      firstPlayed: "2024-01-01",
      lastPlayed: "2024-06-01",
      rank: 10,
      percentile: 90,
      achievements: ["First Win", "10-Game Streak"],
    };

    const report = generatePlayerReport(playerStats);
    expect(report).toContain("🏆 First Win");
    expect(report).toContain("🏆 10-Game Streak");
  });
});
