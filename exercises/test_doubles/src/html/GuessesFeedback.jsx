export default function GuessesFeedback({ guesses, evaluations }) {
  const guessesForDisplay = [
    ...guesses, // guesses made so far
    ...Array(6 - guesses.length).fill("     "), // empty guesses to fill up to 6
  ];

  return (
    <div className="guesses">
      {guessesForDisplay.flatMap((guess, index) => (
        <GuessFeedback
          key={index}
          guess={guess}
          evaluations={evaluations[index]}
        />
      ))}
    </div>
  );
}

function GuessFeedback({ guess, evaluations = [] }) {
  return (
    <div className="guess">
      {guess.split("").map((char, index) => {
        const colour = colours[evaluations[index]] ?? "";
        return (
          <span key={index} className={colour}>
            {char}
          </span>
        );
      })}
    </div>
  );
}

const colours = {
  "+": "green",
  "?": "yellow",
  "-": "gray",
};
