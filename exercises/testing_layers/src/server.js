import { html, redirect } from "../lib/response.js";
import Server from "../lib/server.js";
import gameStatus from "./core/gameStatus.js";
import evaluateGuess from "./core/evaluateGuess.js";
import validateGuess from "./core/validateGuess.js";
import errorMessage from "./html/errorMessage.js";
import guessForm from "./html/guessForm.js";
import guessesFeedback from "./html/guessesFeedback.js";
import page from "./html/page.js";
import statusMessage from "./html/statusMessage.js";
import { gameStateFromURL, gameStateToURL } from "./gameState.js";

const server = new Server();

// return the current state of the game
server.get("/", async ({ request }) => {
  // get base game state from the URL query parameters
  // this will include the previous guesses and any error message
  const { guesses, error } = gameStateFromURL(request.url);

  // generate derived game state
  const status = gameStatus(guesses); // "playing", "won", or "lost"

  // TODO: get colour evaluations for each guess, and pass them on to the guessesFeedback function

  // return game HTML
  // you can use ...(error ? errorMessage(error) : []) to conditionally include an error message
  return html(
    page([
      ...guessesFeedback(guesses),
      ...(status === "playing" ? guessForm() : []),
      ...statusMessage(status),
    ])
  );
});

// handle a new guess submitted via the form
server.post("/", async ({ request }) => {
  // get base game state from the URL query parameters
  const { guesses } = gameStateFromURL(request.url);

  // get new guess from the form data
  const formData = await request.formData();
  const latestGuess = formData.get("latestGuess");

  // TODO: validate the guess
  const error = undefined;
  if (error) {
    // if there's an error, redirect with the error message added to query parameters
  }

  // otherwise, redirect with the latest guess added to query parameters (and no error)
  const nextState = { guesses: [...guesses, latestGuess] };
  return redirect(gameStateToURL(nextState));
});

export default server;
