import type { JsonClient } from "../lib/client.ts";
import { html, redirect } from "../lib/response.ts";
import { Server } from "../lib/server.ts";
import type { BackendEndpoints } from "./backend.ts";
import correctAnswer from "./html/correctAnswer.ts";
import guessForm from "./html/guessForm.ts";
import guessesFeedback from "./html/guessesFeedback.ts";
import page from "./html/page.ts";
import statusMessage from "./html/statusMessage.ts";

type FrontendOptions = {
  port: number;
  backend: JsonClient<BackendEndpoints>;
};

const frontend = new Server<FrontendOptions>();

frontend.get("/", async ({ request, backend }) => {
  // get game instance state from the URL
  const url = new URL(request.url);
  const guesses = url.searchParams.get("guesses")?.split(",") ?? [];
  const errorMessage = url.searchParams.get("errorMessage") ?? undefined;

  // get game play state from the backend
  const { data: gameState } = await backend.post("/state", { guesses });

  // TODO: get guess evaluations from the backend

  // return game HTML
  return html(
    page([
      statusMessage(guesses, gameState),
      ...guessesFeedback(guesses),
      ...(gameState.status === "playing" ? guessForm(errorMessage) : []),
      ...(gameState.status === "lost" ? correctAnswer(gameState) : []),
    ])
  );
});

frontend.post("/", async ({ request, backend }) => {
  // get game instance state from the URL
  const url = new URL(request.url);
  const guesses = url.searchParams.get("guesses")?.split(",") ?? [];

  // get latest guess from the form data
  const formData = await request.formData();
  const latestGuess = formData.get("latestGuess") as string;

  // TODO: validate the latest guess with the backend
  const errorMessage: string | undefined = undefined; // replace with actual validation logic
  if (errorMessage) {
    const params = new URLSearchParams({ guesses, errorMessage });
    return redirect(`/?${params.toString()}`);
  }

  // redirect to the game page with the updated guesses
  const params = new URLSearchParams({ guesses: [...guesses, latestGuess] });
  return redirect(`/?${params.toString()}`);
});

export default frontend;
