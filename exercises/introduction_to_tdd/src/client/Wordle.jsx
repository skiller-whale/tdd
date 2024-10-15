import { useState } from "react";
import { createGame, makeGuess } from "../wordle/wordle.js";
import { getGameState, getGuessesForDisplay } from "./utils.js";

const Wordle = ({ answer }) => {
  const [game, setGame] = useState(createGame(answer));
  const [guess, setGuess] = useState("");
  const [error, setError] = useState(null);

  const gameState = getGameState(game);
  const guessForDisplay = getGuessesForDisplay(game);

  const newGame = () => {
    setGame(createGame());
    setError(null);
    setGuess("");
  };

  const changeGuess = (event) => {
    setGuess(event.currentTarget.value.toLowerCase());
  };

  const submitGuess = (event) => {
    event.preventDefault();
    try {
      setError(null);
      setGame(makeGuess(game, guess));
      setGuess("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <button onClick={newGame}>New Game</button>
      <table>
        <tbody>
          {guessForDisplay.map((letters, index) => (
            <tr key={index}>
              {letters.map((letter, index) => (
                <td key={index} style={{ background: letter.color }}>
                  {letter.letter}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
        onSubmit={submitGuess}
      >
        <input
          aria-label="Guess"
          name="guess"
          type="text"
          value={guess}
          onChange={changeGuess}
        />
        <button disabled={gameState !== "playing"}>Submit Guess</button>
      </form>
      {error ? <div className="error">{error}</div> : null}
      {gameState === "won" ? (
        <div className="success">You won!</div>
      ) : gameState === "lost" ? (
        <div className="error">You lost!</div>
      ) : null}
    </>
  );
};

export default Wordle;
