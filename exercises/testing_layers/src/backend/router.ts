import { getGameState, getGuessEvaluations, getWordValidation } from "./handlers.ts";

export default async function router(request: Request) {
  const url = new URL(request.url);

  if (url.pathname === "/")
    return Response.json({ status: "ok" });

  if (url.pathname === "/validate")
    return getWordValidation(request);

  const stateMatch = url.pathname.match(/^\/games\/([^/]+)\/state$/);
  const stateGameId = decodeURIComponent(stateMatch?.[1] ?? "");
  if (stateMatch)
    return getGameState(stateGameId, request);

  const evaluationsMatch = url.pathname.match(/^\/games\/([^/]+)\/evaluations$/);
  const evaluationsGameId = decodeURIComponent(evaluationsMatch?.[1] ?? "");
  if (evaluationsMatch)
    return getGuessEvaluations(evaluationsGameId, request);

  return Response.json({ error: "Not Found" }, { status: 404 });
}
