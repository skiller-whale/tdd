import { expect, test } from "bun:test";

/**
example JavaScript test:
------------------------

test("description of the test", () => {
  const result = callFunction("with", "some", "arguments");
  expect(result).toBe(42);
});
*/

test.todo('`evaluateGuess` result includes `"-"`s for letters not in the answer');

test.todo('`evaluateGuess` returns all `"g"`s for the correct answer');

test.todo('`evaluateGuess` result includes `"g"` for one correct letter in the correct position');

test.todo('`evaluateGuess` result includes `"o"` for one correct letter in the wrong position');
