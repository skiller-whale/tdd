import { describe, expect, it } from "bun:test";
import { NewShop, Item } from "./NewShop.js";

describe("Sourdough Starter", () => {
  it("never decreases in quality", () => {
    const item = new Item("Sourdough Starter", 0, 80);
    new NewShop([item]).updateQuality();
    expect(item.quality).toBe(80);
  });

  it("never changes its sell-in date", () => {
    const item = new Item("Sourdough Starter", 0, 80);
    new NewShop([item]).updateQuality();
    expect(item.sellIn).toBe(0);
  });
});
