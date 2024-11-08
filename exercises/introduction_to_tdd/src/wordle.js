/**
example JavaScript function (exported):
---------------------------------------

export const nameOfTheFunction = (arg1, arg2, arg3) => {
  const array1 = [1, 2, 3, 4, 5];
  const array2 = ["a", "b", "c", "d", "e"];

  array1.forEach((element, index) => {
    array2[index] = "x"; // elements inside `const` arrays can be reassigned
  });
  // array2 is now equal to ["x", "x", "x", "x", "x"]

  const stringAsArray = "abcde".split(""); // stringAsArray equals ["a", "b", "c", "d", "e"]

  const arrayAsString = stringAsArray.join(""); // arrayAsString equals "abcde"

  return 42; // value to return from the function
}
*/
