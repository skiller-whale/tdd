/**
 * Generates a multi-section text report for a player profile.
 *
 * The report should include these sections:
 *
 *   === PlayerName ===
 *   ID: playerId
 *   Email: email
 *
 *   --- Stats ---
 *   Games Played: N
 *   Games Won: N
 *   Win Rate: N.N%
 *
 *   --- Performance ---
 *   Average Attempts: N.N
 *   Fastest Win: N guess(es)
 *
 *   --- Activity ---
 *   First Played: YYYY-MM-DD
 *   Last Played: YYYY-MM-DD
 *
 *   --- Ranking ---
 *   Rank: #N
 *   Percentile: Top N%
 *
 *   --- Achievements ---
 *   🏆 Achievement 1
 *   🏆 Achievement 2
 */
export function generatePlayerReport({
  playerId,
  email,
  playerName,
  gamesPlayed,
  gamesWon,
  winRate,
  averageAttempts,
  fastestWin,
  firstPlayed,
  lastPlayed,
  rank,
  percentile,
  achievements,
}) {
  return `
=== ${playerName} ===
ID: ${playerId}
Email: ${email}

--- Stats ---
Games Played: ${gamesPlayed}
Games Won: ${gamesWon}
Win Rate: ${(winRate * 100).toFixed(1)}%

--- Performance ---
Average Attempts: ${averageAttempts.toFixed(1)}
Fastest Win: ${fastestWin} guess(es)

--- Activity ---
First Played: ${firstPlayed.slice(0, 10)}
Last Played: ${lastPlayed.slice(0, 10)}

--- Ranking ---
Rank: #${rank}
Percentile: Top ${percentile}%

--- Achievements ---
${formatAchievements(achievements)}
`.trim();
}

/**
 * Formats an array of achievement names into a display string.
 *
 * Returns "No achievements yet." for an empty array, or each
 * achievement on its own line with a trophy emoji prefix.
 */
function formatAchievements(achievements) {
  if (achievements.length === 0) {
    return "No achievements yet.";
  }
  return achievements.map((a) => `🏆 ${a}`).join("\n");
}
