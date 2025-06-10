import htmlResponse from "./html/htmlResponse.ts";
import { getGame, getNewGame, postGame, postNewGame } from "./handlers.ts";

export default async function router(request: Request) {
  const url = new URL(request.url);

  if (url.pathname === "/" && request.method === "GET")
    return getNewGame(request);
  if (url.pathname === "/" && request.method === "POST")
    return postNewGame(request);

  const gamesUrlMatch = url.pathname.match(/^\/games\/([^/]+)$/);
  const gameId = decodeURIComponent(gamesUrlMatch?.[1] ?? "");
  if (gamesUrlMatch && request.method === "GET")
    return getGame(gameId, request);
  if (gamesUrlMatch && request.method === "POST")
    return postGame(gameId, request);

  return htmlResponse(["<p>Page not found.</p>"], 404);
}
