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

const frontend = new Server();

frontend.get("/", async ({ request }) => {
  // get base game state from the URL
  const url = new URL(request.url);
  const guesses = url.searchParams.get("guesses")?.split(",") ?? [];

  // generate derived game state
  const status = gameStatus(guesses);

  // return game HTML
  return html(
    page([
      ...guessesFeedback(guesses),
      ...(status === "playing" ? guessForm() : []),
      ...statusMessage(status),
    ])
  );
});

frontend.post("/", async ({ request }) => {
  // get game instance state from the URL
  const url = new URL(request.url);
  const guesses = url.searchParams.get("guesses")?.split(",") ?? [];

  // get latest guess from the form data
  const formData = await request.formData();
  const latestGuess = formData.get("latestGuess");

  // TODO: validate the latest guess and redirect with error in search params if invalid

  // redirect to the game page with the latest guess added to the guesses in search params
  const params = new URLSearchParams({ guesses: [...guesses, latestGuess] });
  return redirect(`/?${params.toString()}`);
});

export default frontend;
