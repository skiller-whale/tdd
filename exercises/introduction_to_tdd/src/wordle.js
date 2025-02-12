/**
example JavaScript function (exported):
---------------------------------------

export function nameOfTheFunction(arg1, arg2, arg3) {
  const array1 = [1, 2, 3, 4, 5];
  const array2 = ["a", "b", "c", "d", "e"];

  for (let index = 1; index < 5; index++) {
    array2[index] = "x"; // elements inside `const` arrays can be reassigned
  } // array2 is now equal to ["x", "x", "x", "x", "x"]

  const stringAsArray = "abcde".split(""); // stringAsArray equals ["a", "b", "c", "d", "e"]
  const arrayAsString = stringAsArray.join(""); // arrayAsString equals "abcde"

  "abcde".includes("c"); // true
  "abcde".includes("x"); // false
  "ABCDE".toLowerCase(); // "abcde"

  return 42; // value to return from the function
}
*/
