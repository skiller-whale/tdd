/**
 * createGame
 *
 * - check if a value is a number: `typeof value === "number"`
 * - check if a value is a Boolean: `typeof value === "boolean"`
 * - check if a value is a string: `typeof value === "string"`
 * - check if a value is _not_ a string: `typeof value !== "string"`
 * - check if a string is of a certain length: `string.length === n`
 * - check if an array contains a certain kind of value: `array.some(predicate)`,
 *   e.g. `array.some((value) => typeof value === "number")`
 */
export const createGame = (dictionary, answer) => {
  if (!Array.isArray(dictionary) || dictionary.length === 0) {
    throw new Error("bad or missing dictionary");
  }

  if (!dictionary.includes(answer)) {
    throw new Error("answer not in dictionary");
  }

  return {
    dictionary,
    answer,
    guesses: [],
  };
};

/**
 * makeGuess
 *
 * - create an object: `{ property1: value1, property2: value2 }`
 * - create an array: `[element1, element2]`
 * - copy an object with one value changed: `{ ...oldObject, property: newValue }`
 * - copy an array with new element at the end: `[...oldArray, newElement]`
 * - check if array includes an element: `array.includes(element)`
 * - check if array _doesn't_ include an element: `!array.includes(element)`
 */

/**
 * evaluateGuess
 * - create an array of characters: e.g. `const array = ["-", "-", "-", "-", "-"]`
 * - split a string into an array of characters: `string.split("")`
 * - collapse an array of characters into a string: `array.join("")`
 * - loop through an array of characters: `array.forEach((char, index) => { ... })`
 * - index a character on a string or element on an array: `string[index]` or `array[index]`
 * - change an element in an array: `array[index] = newValue`
 *   (note this _doesn't_ work on strings, only arrays)
 * - check if a character is included in a string: `string.includes(char)`
 */
