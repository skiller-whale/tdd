import { describe, expect, it } from "bun:test";

describe("Numbers", () => {
  it("compares values and collections", () => {
    const values = [2, 4, 6];
    expect(values[2]).toBe(6);
    expect(values).toEqual([2, 4, 6]);
  });

  it("checks containment and length", () => {
    const values = [2, 4, 6];
    expect(values).toContain(4);
    expect(values).toHaveLength(3);
  });

  describe("error cases", () => {
    it("checks failures", () => {
      expect(() => {
        throw new Error("bad input");
      }).toThrow();
    });
  });
});
