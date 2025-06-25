export default function guessesFeedback(guesses, evaluations) {
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
    ...guessesForDisplay.flatMap((guess, index) =>
      guessFeedback(guess, evaluations[index] ?? [])
    ),
    "</div>",
  ];
}

function guessFeedback(guess, evaluations) {
  return [
    '<div class="guess">',
    ...guess
      .split("")
      .map((char, index) => guessCharFeedback(char, evaluations[index])),
    "</div>",
  ];
}

function guessCharFeedback(char, evaluation) {
  const colours = {
    "+": "green",
    "?": "yellow",
    "-": "gray",
  };
  const colour = colours[evaluation] ?? "";
  return `<span class="${colour}">${char}</span>`;
}
