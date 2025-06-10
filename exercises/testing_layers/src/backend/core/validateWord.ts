import english from "../dictionaries/english.ts";

export default function validateWord(word: string): string | undefined {
  if (word === "hello") return "Hello is not a valid guess.";
  return undefined;
}
