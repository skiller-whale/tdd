import type { GameState } from "../../backend/core/gameState.ts";

type GamePageProps = {
  guesses: string[];
  evaluations?: string[];
  gameState: GameState;
  errorMessage?: string;
};

export default function game({
  guesses,
  evaluations = [],
  gameState,
  errorMessage,
}: GamePageProps) {
  const remainingGuesses = 6 - guesses.length;
  const evaluationsOneWayOrAnother =
    (gameState as any).evaluations ?? evaluations;

  switch (gameState.status) {
    case "playing":
      return [
        `<p class="status">You have ${remainingGuesses} ${
          remainingGuesses === 1 ? "guess" : "guesses"
        } left.</p>`,
        ...guessesFeedback(guesses, evaluationsOneWayOrAnother),
        ...guessForm(errorMessage),
      ];

    case "won":
      return [
        '<p class="status">You won!</p>',
        ...guessesFeedback(guesses, evaluationsOneWayOrAnother),
      ];

    case "lost":
      return [
        '<p class="status">You lost!</p>',
        ...guessesFeedback(guesses, evaluationsOneWayOrAnother),
        "<p>The correct answer was</p>",
        `<p class="correct-answer">${gameState.correctAnswer}</p>`,
      ];
  }
}

function guessForm(errorMessage?: string) {
  return [
    "<form method='POST'>",
    `<input type="text" name="latestGuess" aria-label="guess" autofocus autocomplete="off" required>`,
    errorMessage ? `<p class="error">${errorMessage}</p>` : "",
    "</form>",
  ];
}

function guessesFeedback(guesses: string[], evaluations: string[]) {
  const guessesForDisplay = [
    guesses[0] ?? "     ",
    guesses[1] ?? "     ",
    guesses[2] ?? "     ",
    guesses[3] ?? "     ",
    guesses[4] ?? "     ",
    guesses[5] ?? "     ",
  ];

  return [
    '<div class="guesses">',
    ...guessesForDisplay.flatMap((guess, guessIndex) => [
      '<div class="guess">',
      ...guess.split("").map((char, charIndex) => {
        const color = getColorForChar(charIndex, guessIndex, evaluations);
        return color
          ? `<span class="char ${color}">${char}</span>`
          : `<span class="char">${char}</span>`;
      }),
      "</div>",
    ]),
    "</div>",
  ];
}

function getColorForChar(
  charIndex: number,
  guessIndex: number,
  evaluations: string[]
): string | null {
  const displayColors: Record<string, string> = {
    "-": "gray",
    o: "yellow",
    g: "green",
  };
  const evaluation = evaluations[guessIndex]?.[charIndex];
  return evaluation ? displayColors[evaluation] : null;
}
