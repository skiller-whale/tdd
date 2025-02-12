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

test.todo('`evaluateGuess` result includes `"g"`s for letters in the right place');

test.todo('`evaluateGuess` result includes `"o"`s for letters in the wrong place');
