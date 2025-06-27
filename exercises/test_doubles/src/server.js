import { html, redirect } from "../lib/response.js";
import Server from "../lib/server.js";
import { newGame, makeGuess } from "./core/gameState.js";
import getRandomAnswer from "./core/getRandomAnswer.js";
import guessForm from "./html/guessForm.js";
import guessesFeedback from "./html/guessesFeedback.js";
import newGameForm from "./html/newGameForm.js";
import page from "./html/page.js";
import stats from "./html/stats.js";
import statusMessage from "./html/statusMessage.js";

const server = new Server();

server.get("/", ({ cookies }) => {
  // create a session ID cookie if it doesn't exist
  if (!cookies.get("sessionId")) {
    cookies.set("sessionId", crypto.randomUUID());
  }

  // return the HTML for the home page with a button to start a new game, and set session cookies
  return html(page(newGameForm()), { cookies });
});

server.post("/", async ({ database }) => {
  // create a new game
  const game = newGame("whale"); // TODO: randomize the answer using getRandomAnswer()
  database.saveGame(game);

  // redirect to the page for that game
  return redirect(`/games/${game.id}`);
});

server.get("/games/:id", async ({ params, cookies, database }) => {
  // get the game from the database
  const game = database.getGame(params.id);
  if (!game) {
    return html("<p>Game not found</p>", { status: 404 });
  }

  // TODO: get the user's game history

  // return game HTML
  return html(
    page([
      ...guessesFeedback(game.guesses, game.evaluations),
      ...(game.status === "playing" ? guessForm(game.error) : []),
      ...statusMessage(game.status),
      ...(game.status !== "playing" ? newGameForm() : []),
      // TODO: show user stats if the game is over
    ])
  );
});

server.post("/games/:id", async ({ request, params, cookies, database }) => {
  // get the game from the database
  const game = database.getGame(params.id);
  if (!game) {
    return html("<p>Game not found</p>", { status: 404 });
  }

  // get latest guess from the form data and update the game state
  const formData = await request.formData();
  const latestGuess = formData.get("latestGuess");
  const gameAfterGuess = makeGuess(game, latestGuess);
  database.saveGame(gameAfterGuess);

  if (gameAfterGuess.status !== "playing") {
    // TODO: update the user's game history
  }

  // redirect to the game page
  return redirect(`/games/${game.id}?`);
});

export default server;
