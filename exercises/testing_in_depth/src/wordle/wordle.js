/*
- `laWords` is an array of (common) five-letter words that are valid possible answers.
- `taWords` is an array of (less common) five-letter words that are valid guesses, but _not_ possible answers.
- `allWords` is a combined array of both of these.
*/

import laWords from "./words/la_words.js";
import taWords from "./words/ta_words.js";
const allWords = laWords.concat(taWords);

// create game
export const createGame = () => {
  const getRandomInteger = (range) => Math.floor(Math.random() * (range - 1));
  return {
    answer: laWords[getRandomInteger(laWords.length)],
    guesses: [],
  };
};

/*
JS cheatsheet:

- to create a new array with a new element added to the end, use `[...oldArray, newElement]`
- to create a new object with a single property changed, use `{ ...oldObject, property: newValue }`
- to check if an array includes a given element, use `array.includes(element)`
- to throw an error, use `throw new Error("error message")`
*/
// make guess
// export const makeGuess = (game, guess) => {};

/*
JS cheatsheet:

- to split a string into an array of characters, use `string.split("")`
- to collapse an array of characters back into a string, use `array.join("")`
- to loop through an array of characters, use `array.forEach((char, index) => { ... })`
- to index a character on a string or element on an array, use `string[index]` or `array[index]`
- to check if a character is included in a string, use `string.includes(char)`
*/
// evaluate guess
// export const evaluateGuess = (answer, guess) => {};
