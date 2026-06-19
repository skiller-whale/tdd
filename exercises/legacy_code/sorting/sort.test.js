import { describe, expect, it } from "bun:test";

// Do not edit this function
function sort(list) {
  const sortFn = (a, b) => Number(a) - Number(b);
  return list.toSorted(sortFn);
}

it("given a pair of a number-string and number, sorts the string first", () => {
  expect(sort(["2", 1])).toEqual([1, "2"]);
});
