import { createGame, makeGuess } from "./wordle/wordle.js";

// router function
export default async (dao, request) => {
  const url = new URL(request.url);
  const gameMatch = url.pathname.match(/^\/games\/(.+)$/);
  const gameId = gameMatch ? gameMatch[1] : undefined;

  // create new game
  if (url.pathname === "/games" && request.method === "POST") {
    // const { dictionary, answer } = await request.json();
    // const game = createGame(dictionary, answer);
    // const savedGame = await dao.createGame(game);
    // const { id, guesses, evaluations } = savedGame;
    // return response({ id, guesses, evaluations }, 200);
  }

  // make a guess
  if (gameId && request.method === "POST") {
    // const game = await dao.getGame(gameId);
    // const { guess } = await request.json();
    // const newGameState = makeGuess(game, guess);
    // await dao.updateGame(newGameState);
    // const { id, guesses, evaluations } = newGameState;
    // return response({ id, guesses, evaluations }, 200);
  }

  return response({ error: "endpoint not found" }, 404);
};

// helper functions
const response = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
