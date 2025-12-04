import { html, redirect } from "../lib/response.js";
import Server from "../lib/server.js";
import { makeGuess, newGame } from "./core/gameState.js";
import getRandomAnswer from "./core/getRandomAnswer.js";
import GuessForm from "./html/GuessForm.jsx";
import GuessesFeedback from "./html/GuessesFeedback.jsx";
import NewGameForm from "./html/NewGameForm.jsx";
import Page from "./html/Page.jsx";
import Stats from "./html/Stats.jsx";
import StatusMessage from "./html/StatusMessage.jsx";

const server = new Server();

// GET "/": show a button to start a new game
server.get("/", () => {
  // return the HTML for the home page with a button to start a new game
  return html(
    <Page>
      <NewGameForm />
    </Page>
  );
});

// POST "/": create a new game and redirect to its page
server.post("/", async ({ database }) => {
  // create a new game
  const game = newGame("whale"); // TODO: randomize the answer using getRandomAnswer()
  database.saveGame(game);

  // redirect to the page for that game
  return redirect(`/games/${game.id}`);
});

// GET "/games/:id": show the game state, allow guesses
server.get("/games/:id", async ({ params, database, sessionID }) => {
  // get the game from the database
  const game = database.getGame(params.id);

  // TODO: get the user's game history

  // return game HTML
  return html(
    <Page>
      <GuessesFeedback guesses={game.guesses} evaluations={game.evaluations} />
      {game.status === "playing" ? <GuessForm error={game.error} /> : null}
      <StatusMessage status={game.status} />
      {game.status !== "playing" ? <NewGameForm /> : null}
      {/** TODO: show user stats if the game is over */}
      {/** game.status !== "playing" ? <Stats /> : null */}
    </Page>
  );
});

// POST "/games/:id": handle a guess submission for a game
server.post("/games/:id", async ({ request, params, database, sessionID }) => {
  // get the game from the database
  const game = database.getGame(params.id);

  // get latest guess from the form data and update the game state
  const formData = await request.formData();
  const latestGuess = formData.get("latestGuess");
  const gameAfterGuess = makeGuess(game, latestGuess);
  database.saveGame(gameAfterGuess);

  // when the game is over, save the user's game history
  if (gameAfterGuess.status !== "playing") {
    // TODO
  }

  // redirect to the game page
  return redirect(`/games/${game.id}?`);
});

export default server;
