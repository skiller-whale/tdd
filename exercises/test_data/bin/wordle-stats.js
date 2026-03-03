#!/usr/bin/env bun
import {
  runInteractive,
  listGames,
  showPlayerStats,
  showPlayerReport,
  showHelp,
  getPlayerNames,
} from "./commands.js";

const args = process.argv.slice(2);

if (args.length === 0) {
  // Interactive mode
  runInteractive();
} else {
  // Command-line mode
  const command = args[0];

  switch (command) {
    case "list":
      listGames();
      break;
    case "stats":
      if (args[1]) {
        showPlayerStats(args[1]);
      } else {
        console.log("\nError: Please specify a player name\n");
        console.log(`Available players: ${getPlayerNames().join(", ")}\n`);
      }
      break;
    case "report":
      if (args[1]) {
        showPlayerReport(args[1]);
      } else {
        console.log("\nError: Please specify a player name\n");
        console.log(`Available players: ${getPlayerNames().join(", ")}\n`);
      }
      break;
    case "help":
      showHelp();
      break;
    default:
      console.log(`\nUnknown command: ${command}\n`);
      showHelp();
  }
}
