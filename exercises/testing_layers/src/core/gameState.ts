export type GameState = {
  status: "playing" | "won" | "lost";
  correctAnswer?: string;
};

export default function gameState(guesses: string[]): GameState {
  const status =
    guesses.at(-1) === "whale"
      ? "won"
      : guesses.length >= 6
      ? "lost"
      : "playing";

  return status === "lost" ? { status, correctAnswer: "whale" } : { status };
}
