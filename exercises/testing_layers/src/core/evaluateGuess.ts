export default function evaluateGuess(guess: string): string {
  const result = Array(guess.length).fill("-");
  const correctAnswerChars: (string | null)[] = ["w", "h", "a", "l", "e"];
  const guessChars: (string | null)[] = guess.split("");

  // First pass: check for greens
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === correctAnswerChars[i]) {
      result[i] = "g";
      correctAnswerChars[i] = null; // Mark as used
      guessChars[i] = null; // Mark as used
    }
  }

  // Second pass: check for oranges
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] !== null && correctAnswerChars.includes(guessChars[i]!)) {
      result[i] = "o";
      const index = correctAnswerChars.indexOf(guessChars[i]!);
      correctAnswerChars[index] = null; // Mark as used
    }
  }

  return result.join("");
}
