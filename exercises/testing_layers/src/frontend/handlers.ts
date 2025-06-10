import fetchFromBackend from "./client.ts";
import htmlResponse from "./html/htmlResponse.ts";
import game from "./html/game.ts";
import newGame from "./html/newGame.ts";

export function getNewGame(request: Request) {
  const url = new URL(request.url);
  const errorMessage = url.searchParams.get("errorMessage") ?? undefined;
  return htmlResponse(newGame({ errorMessage }));
}

export async function postNewGame(request: Request) {
  const formData = await request.formData();
  const answer = formData.get("answer") as string;

  const validation = await fetchFromBackend(`/validate`, { word: answer });
  if (!validation.valid) {
    return Response.redirect(
      `/?errorMessage=${encodeURIComponent(validation.error)}`
    );
  }

  const encodedAnswer = btoa(answer);
  return Response.redirect(`/games/${encodeURIComponent(encodedAnswer)}`);
}

export async function getGame(gameId: string, request: Request) {
  const url = new URL(request.url);
  const guesses = url.searchParams.getAll("guesses");
  const errorMessage = url.searchParams.get("errorMessage") ?? undefined;

  // get game state from backend
  const body = { guesses };
  const gameState = await fetchFromBackend(`/games/${gameId}/state`, body);

  // TODO: get guess evaluations from the backend

  // return game HTML
  return htmlResponse(game({ guesses, gameState, errorMessage }));
}

export async function postGame(gameId: string, request: Request) {
  const url = new URL(request.url);
  const guesses = url.searchParams.getAll("guesses");

  const formData = await request.formData();
  const latestGuess = formData.get("latestGuess") as string;

  const validation = await fetchFromBackend(`/validate`, { word: latestGuess });
  if (!validation.valid) {
    return Response.redirect(
      `/games/${gameId}?${guessesParams(
        guesses
      )}&errorMessage=${encodeURIComponent(validation.error)}`
    );
  }

  return Response.redirect(
    `/games/${gameId}?${guessesParams([...guesses, latestGuess])}`
  );
}

function guessesParams(guesses: string[]) {
  return guesses.length > 0
    ? guesses.map((guess) => `guesses=${encodeURIComponent(guess)}`).join("&")
    : "";
}
