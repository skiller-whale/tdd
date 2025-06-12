import { JsonServer } from "../lib/server.ts";
import evaluateGuess from "./core/evaluateGuess.ts";
import gameState, { type GameState } from "./core/gameState.ts";
import validateGuess from "./core/validateGuess.ts";

const backend = new JsonServer<BackendOptions, BackendEndpoints>();

type BackendOptions = {
  port: number;
};

// define the types of data coming in and going out of the endpoints here
export type BackendEndpoints = {
  "/state": {
    POST: {
      accepts: { guesses: string[] };
      result: GameState;
    };
  };
};

// define the endpoints here
backend.post("/state", async ({ payload }) => {
  const { guesses } = payload;
  return gameState(guesses);
});

export default backend;
