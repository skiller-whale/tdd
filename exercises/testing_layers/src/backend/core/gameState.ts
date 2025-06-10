export type GameState = {
  status: "playing" | "won" | "lost";
  correctAnswer?: string;
};

export default function gameState(
  correctAnswer: string,
  guesses: string[]
): GameState {
  const status =
    guesses.at(-1) === correctAnswer
      ? "won"
      : guesses.length >= 6
      ? "lost"
      : "playing";

  return status === "lost" ? { status, correctAnswer } : { status };
}
