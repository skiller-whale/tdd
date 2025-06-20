/**
 * We use URL search parameters to store the game state between requests. This
 * is not a very common practice in modern web applications, but keeps things
 * simple for this exercise (in particular, it means we don't need any session
 * management on the server or JavaScript in the browser to make things work).
 */

export function gameStateToURL({ guesses, error }) {
  const params = new URLSearchParams({ guesses: guesses.join(",") });
  if (error) params.set("error", error);
  return `/?${params.toString()}`;
}

export function gameStateFromURL(urlString) {
  const url = new URL(urlString);
  const params = new URLSearchParams(url.search);
  const guesses = params.get("guesses")?.split(",") ?? [];
  const error = params.get("error") ?? undefined;
  return { guesses, error };
}
