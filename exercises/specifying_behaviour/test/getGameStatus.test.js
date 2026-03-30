import { describe, expect, it } from "bun:test";
import { getGameStatus } from "../src/getGameStatus.js";

describe("getGameStatus", () => {
  it("returns 'won' when the last guess matches the target", () => {
    expect(getGameStatus(["crane"], "crane")).toBe("won");
  });

  it("returns 'lost' when 6 wrong guesses have been made", () => {
    expect(getGameStatus(["audio", "ghost", "plumb", "fizzy", "words", "crane"], "blank")).toBe("lost");
  });

  it("returns 'in_progress' when fewer than 6 guesses have been made", () => {
    expect(getGameStatus(["audio"], "ghost")).toBe("in_progress");
  });
});
