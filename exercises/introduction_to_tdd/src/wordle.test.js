import { expect, test } from "bun:test";

/**
example JavaScript test:
------------------------

test("description of the test", () => {
  const result = callFunction("with", "some", "arguments");
  expect(result).toBe(42);
});
*/

test.todo('`evaluateGuess` returns `"-----"` for a completely incorrect guess');

test.todo('`evaluateGuess` returns `"ggggg"` for a completely correct guess');

test.todo('`evaluateGuess` result includes `"g"` for one correct letter in the correct position');

test.todo('`evaluateGuess` result includes `"y"` for one correct letter in the wrong position');
