export default function guessesFeedback(guesses: string[], evaluations: string[] = []) {
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
