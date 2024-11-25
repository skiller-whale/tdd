import { expect, test } from "bun:test";
import { createGame, evaluateGuess, makeGuess } from "./wordle.js";

test("`createGame` returns a game object", () => {
  const dictionary = ["abcde", "fghij", "klmno"];
  const answer = "abcde";
  const game = createGame(dictionary, answer);
  expect(game).toEqual({
    dictionary,
    answer,
    guesses: [],
    evaluations: [],
  });
});

test("`makeGuess` adds guesses to the guesses array", () => {
  const dictionary = ["abcde", "fghij", "klmno"];
  const answer = "abcde";
  const game1 = createGame(dictionary, answer);
  const game2 = makeGuess(game1, "fghij");
  const game3 = makeGuess(game2, "klmno");
  expect(game2.guesses).toEqual(["fghij"]);
  expect(game3.guesses).toEqual(["fghij", "klmno"]);
});

test("`makeGuess` adds evaluations to the evaluations array", () => {
  const dictionary = ["abcde", "axxxb", "bbbbb"];
  const answer = "abcde";
  const game1 = createGame(dictionary, answer);
  const game2 = makeGuess(game1, "axxxb");
  const game3 = makeGuess(game2, "bbbbb");
  expect(game2.evaluations).toEqual(["g---o"]);
  expect(game3.evaluations).toEqual(["g---o", "-g---"]);
});

test("`evaluateGuess` returns '-' for incorrect letters", () => {
  expect(evaluateGuess("abcde", "vwxyz")).toBe("-----");
});

test("`evaluateGuess` returns 'g' for letters in the right place", () => {
  expect(evaluateGuess("abcde", "axxxx")).toBe("g----");
  expect(evaluateGuess("abcde", "xbxxx")).toBe("-g---");
  expect(evaluateGuess("abcde", "xxcxx")).toBe("--g--");
  expect(evaluateGuess("abcde", "xxxdx")).toBe("---g-");
  expect(evaluateGuess("abcde", "xxxxe")).toBe("----g");
  expect(evaluateGuess("abcde", "abcde")).toBe("ggggg");
});

test("`evaluateGuess` returns 'o' for letters in the wrong place", () => {
  expect(evaluateGuess("abcde", "e----")).toBe("o----");
  expect(evaluateGuess("abcde", "-a---")).toBe("-o---");
  expect(evaluateGuess("abcde", "--b--")).toBe("--o--");
  expect(evaluateGuess("abcde", "---c-")).toBe("---o-");
  expect(evaluateGuess("abcde", "----d")).toBe("----o");
  expect(evaluateGuess("abcde", "eabcd")).toBe("ooooo");
});

test("`evaluateGuess` doesn't give false positives for repeat letters", () => {
  expect(evaluateGuess("abcde", "aaaaa")).toBe("g----");
  expect(evaluateGuess("abcde", "xaaaa")).toBe("-o---");
  expect(evaluateGuess("abcde", "exxxe")).toBe("----g");
});
