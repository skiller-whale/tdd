import gameState from "./core/gameState.ts";
import evaluateGuess from "./core/evaluateGuess.ts";
import validateWord from "./core/validateWord.ts";

export async function getGameState(gameId: string, request: Request): Promise<Response> {
  const answer = atob(gameId);
  const body = (await request.json()) as { guesses: string[] };
  const result = gameState(answer, body.guesses);
  return Response.json(result);
}

export async function getGuessEvaluations(gameId: string, request: Request): Promise<Response> {
  return Response.json({ error: "not yet implemented" }, { status: 500 });
}

export async function getWordValidation(request: Request): Promise<Response> {
  const { word } = (await request.json()) as { word: string };
  return Response.json({ valid: true });
}
