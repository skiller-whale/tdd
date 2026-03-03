import { readFileSync } from "fs";
import { resolve } from "path";
import * as readline from "readline";
import { summarizeGame } from "../src/gameResult.js";
import { calculatePlayerStats } from "../src/playerStats.js";
import { generatePlayerReport } from "../src/report.js";

// Load sample data
const dataPath = resolve(import.meta.dir, "../data/sample-results.json");
const gameResults = JSON.parse(readFileSync(dataPath, "utf8"));

// Helper: Get unique player names
export function getPlayerNames() {
  return [...new Set(gameResults.map((r) => r.playerName))];
}

// Helper: Get games for a specific player
export function getPlayerGames(playerName) {
  return gameResults.filter((r) => r.playerName === playerName);
}

// Command implementations
export function listGames() {
  console.log("\n=== All Game Results ===\n");
  gameResults.forEach((result, index) => {
    console.log(
      `${String(index + 1).padStart(String(gameResults.length).length)}. ${summarizeGame(result)} [${result.date}]`,
    );
  });
  console.log(`\nTotal: ${gameResults.length} games\n`);
}

export function showPlayerStats(playerName) {
  const playerGames = getPlayerGames(playerName);
  if (playerGames.length === 0) {
    console.log(`\nNo games found for player: ${playerName}\n`);
    return;
  }

  const stats = calculatePlayerStats(playerGames);
  console.log(`\n=== Stats for ${playerName} ===\n`);
  console.log(`Games Played: ${stats.gamesPlayed}`);
  console.log(`Games Won: ${stats.gamesWon}`);
  console.log(`Win Rate: ${(stats.winRate * 100).toFixed(1)}%`);
  console.log(`Average Attempts: ${stats.averageAttempts.toFixed(1)}\n`);
}

export function showPlayerReport(playerName) {
  const playerGames = getPlayerGames(playerName);
  if (playerGames.length === 0) {
    console.log(`\nNo games found for player: ${playerName}\n`);
    return;
  }

  const stats = calculatePlayerStats(playerGames);
  const allPlayerStats = getPlayerNames().map((name) => ({
    playerName: name,
    ...calculatePlayerStats(getPlayerGames(name)),
  }));
  const ranked = rankPlayers(allPlayerStats, {
    sortBy: "winRate",
    order: "desc",
  });
  const playerRank = ranked.find((p) => p.playerName === playerName);

  // Calculate additional stats
  const wins = playerGames.filter((g) => g.guesses.at(-1) === g.answer);
  const fastestWin =
    wins.length > 0 ? Math.min(...wins.map((g) => g.guesses.length)) : 0;
  const dates = playerGames.map((g) => g.date).sort();
  const percentile = ((playerRank.rank / ranked.length) * 100).toFixed(0);

  // Generate sample achievements
  const achievements = [];
  if (stats.winRate === 1.0) achievements.push("Perfect Record");
  if (fastestWin === 1) achievements.push("Hole-in-One");
  if (stats.gamesPlayed >= 5) achievements.push("Dedicated Player");
  if (stats.averageAttempts < 3) achievements.push("Speed Solver");

  const report = generatePlayerReport({
    playerId: `player-${playerName.toLowerCase()}`,
    email: `${playerName.toLowerCase()}@example.com`,
    playerName,
    gamesPlayed: stats.gamesPlayed,
    gamesWon: stats.gamesWon,
    winRate: stats.winRate,
    averageAttempts: stats.averageAttempts,
    fastestWin,
    firstPlayed: dates[0],
    lastPlayed: dates[dates.length - 1],
    rank: playerRank.rank,
    percentile,
    achievements,
  });

  console.log("\n" + report + "\n");
}

function rankPlayers(playerStatsList, { sortBy = "winRate", order = "desc" } = {}) {
  const sorted = playerStatsList.toSorted((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (aValue === bValue) return 0;
    if (order === "asc") {
      return aValue < bValue ? -1 : 1;
    } else {
      return aValue > bValue ? -1 : 1;
    }
  });

  return sorted.map((player, index) => ({ ...player, rank: index + 1 }));
}

export function showHelp() {
  console.log(`
Wordle Stats CLI
================

Commands:
  bun run start list              List all game results
  bun run start stats <player>    Show stats for a specific player
  bun run start report <player>   Generate full player report
  bun run start help              Show this help message

Interactive mode:
  bun run start                   Start interactive menu

Available players: ${getPlayerNames().join(", ")}
  `);
}

export function showMenu() {
  console.log(`
╔═════════════════════════════════════╗
║     Wordle Stats - Main Menu        ║
╠═════════════════════════════════════╣
║  1. List all games                  ║
║  2. Show player stats               ║
║  3. Generate player report          ║
║  0. Exit                            ║
╚═════════════════════════════════════╝
  `);
}

// Interactive mode
export async function runInteractive() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (prompt) =>
    new Promise((resolve) => rl.question(prompt, resolve));

  while (true) {
    showMenu();
    const choice = await question("Select an option: ");

    switch (choice.trim()) {
      case "1":
        listGames();
        await question("Press Enter to continue...");
        break;
      case "2": {
        console.log(`\nAvailable players: ${getPlayerNames().join(", ")}`);
        const player = await question("Enter player name: ");
        showPlayerStats(player.trim());
        await question("Press Enter to continue...");
        break;
      }
      case "3": {
        console.log(`\nAvailable players: ${getPlayerNames().join(", ")}`);
        const player = await question("Enter player name: ");
        showPlayerReport(player.trim());
        await question("Press Enter to continue...");
        break;
      }
      case "0":
        console.log("\nGoodbye!\n");
        rl.close();
        process.exit(0);
      default:
        console.log("\nInvalid option. Please try again.\n");
        await question("Press Enter to continue...");
    }
  }
}
