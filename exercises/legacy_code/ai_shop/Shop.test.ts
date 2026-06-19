import { describe, expect, it } from "bun:test";
import { Shop } from "./Shop.js";
import { Item } from "./Item.js";

describe("Shop", () => {
  describe("normal items (e.g. Bread)", () => {
    it("decreases sellIn by 1 each day", () => {
      const item = new Item("Bread", 5, 20);
      new Shop([item]).updateQuality();
      expect(item.sellIn).toBe(4);
    });

    it("decreases quality by 1 before the sell-by date", () => {
      const item = new Item("Bread", 5, 20);
      new Shop([item]).updateQuality();
      expect(item.quality).toBe(19);
    });

    it("decreases quality by 2 on the sell-by date (sellIn = 0)", () => {
      const item = new Item("Bread", 0, 20);
      new Shop([item]).updateQuality();
      expect(item.quality).toBe(18);
    });

    it("decreases quality by 2 each day after the sell-by date", () => {
      const item = new Item("Bread", -3, 20);
      new Shop([item]).updateQuality();
      expect(item.quality).toBe(18);
    });

    it("continues to decrease sellIn when quality is 0", () => {
      const item = new Item("Bread", 5, 0);
      new Shop([item]).updateQuality();
      expect(item.sellIn).toBe(4);
    });

    it("quality never drops below 0 before the sell-by date", () => {
      const item = new Item("Bread", 5, 0);
      new Shop([item]).updateQuality();
      expect(item.quality).toBe(0);
    });

    it("quality never drops below 0 on the sell-by date", () => {
      const item = new Item("Bread", 0, 1);
      new Shop([item]).updateQuality();
      expect(item.quality).toBe(0);
    });

    it("quality never drops below 0 after the sell-by date", () => {
      const item = new Item("Bread", -1, 1);
      new Shop([item]).updateQuality();
      expect(item.quality).toBe(0);
    });

    it("degrades correctly over multiple days spanning the sell-by date", () => {
      const item = new Item("Bread", 2, 10);
      const shop = new Shop([item]);
      shop.updateQuality(); // sellIn 1, quality 9
      shop.updateQuality(); // sellIn 0, quality 8
      shop.updateQuality(); // sellIn -1, quality 6
      shop.updateQuality(); // sellIn -2, quality 4
      expect(item.quality).toBe(4);
      expect(item.sellIn).toBe(-2);
    });
  });

  describe("Fruit Cake", () => {
    it("decreases sellIn by 1", () => {
      const item = new Item("Fruit Cake", 5, 10);
      new Shop([item]).updateQuality();
      expect(item.sellIn).toBe(4);
    });

    it("increases quality by 1 before the sell-by date", () => {
      const item = new Item("Fruit Cake", 5, 10);
      new Shop([item]).updateQuality();
      expect(item.quality).toBe(11);
    });

    it("increases quality by 2 on the sell-by date (sellIn = 0)", () => {
      const item = new Item("Fruit Cake", 0, 10);
      new Shop([item]).updateQuality();
      expect(item.quality).toBe(12);
    });

    it("increases quality by 2 after the sell-by date", () => {
      const item = new Item("Fruit Cake", -2, 10);
      new Shop([item]).updateQuality();
      expect(item.quality).toBe(12);
    });

    it("quality never exceeds 50", () => {
      const item = new Item("Fruit Cake", 5, 50);
      new Shop([item]).updateQuality();
      expect(item.quality).toBe(50);
    });

    it("quality is capped at 50 before the sell-by date", () => {
      const item = new Item("Fruit Cake", 5, 49);
      new Shop([item]).updateQuality();
      expect(item.quality).toBe(50);
    });

    it("quality is capped at 50 after the sell-by date", () => {
      const item = new Item("Fruit Cake", -1, 49);
      new Shop([item]).updateQuality();
      expect(item.quality).toBe(50);
    });

    it("increases quality over many days spanning the sell-by date", () => {
      const item = new Item("Fruit Cake", 2, 40);
      const shop = new Shop([item]);
      shop.updateQuality(); // +1, sellIn 1, quality 41
      shop.updateQuality(); // +1, sellIn 0, quality 42
      shop.updateQuality(); // +2, sellIn -1, quality 44
      shop.updateQuality(); // +2, sellIn -2, quality 46
      expect(item.quality).toBe(46);
    });
  });

  describe("Sourdough Starter", () => {
    it("never changes quality", () => {
      const item = new Item("Sourdough Starter", 0, 80);
      new Shop([item]).updateQuality();
      expect(item.quality).toBe(80);
    });

    it("never changes the sellIn date", () => {
      const item = new Item("Sourdough Starter", 0, 80);
      new Shop([item]).updateQuality();
      expect(item.sellIn).toBe(0);
    });

    it("remains completely unchanged after many days", () => {
      const item = new Item("Sourdough Starter", 0, 80);
      const shop = new Shop([item]);
      for (let i = 0; i < 30; i++) {
        shop.updateQuality();
      }
      expect(item.quality).toBe(80);
      expect(item.sellIn).toBe(0);
    });
  });

  describe("Wedding Cake", () => {
    it("decreases sellIn by 1", () => {
      const item = new Item("Wedding Cake", 15, 20);
      new Shop([item]).updateQuality();
      expect(item.sellIn).toBe(14);
    });

    it("increases quality by 1 with more than 10 days remaining", () => {
      const item = new Item("Wedding Cake", 15, 20);
      new Shop([item]).updateQuality();
      expect(item.quality).toBe(21);
    });

    it("increases quality by 1 with exactly 11 days remaining", () => {
      const item = new Item("Wedding Cake", 11, 20);
      new Shop([item]).updateQuality();
      expect(item.quality).toBe(21);
    });

    it("increases quality by 2 with exactly 10 days remaining", () => {
      const item = new Item("Wedding Cake", 10, 20);
      new Shop([item]).updateQuality();
      expect(item.quality).toBe(22);
    });

    it("increases quality by 2 with 6 days remaining", () => {
      const item = new Item("Wedding Cake", 6, 20);
      new Shop([item]).updateQuality();
      expect(item.quality).toBe(22);
    });

    it("increases quality by 3 with exactly 5 days remaining", () => {
      const item = new Item("Wedding Cake", 5, 20);
      new Shop([item]).updateQuality();
      expect(item.quality).toBe(23);
    });

    it("increases quality by 3 with 1 day remaining", () => {
      const item = new Item("Wedding Cake", 1, 20);
      new Shop([item]).updateQuality();
      expect(item.quality).toBe(23);
    });

    it("drops quality to 0 on the sell-by date (sellIn = 0)", () => {
      const item = new Item("Wedding Cake", 0, 20);
      new Shop([item]).updateQuality();
      expect(item.quality).toBe(0);
    });

    it("quality stays 0 after the sell-by date", () => {
      const item = new Item("Wedding Cake", -1, 0);
      new Shop([item]).updateQuality();
      expect(item.quality).toBe(0);
    });

    it("sellIn continues to decrease after the sell-by date", () => {
      const item = new Item("Wedding Cake", -1, 0);
      new Shop([item]).updateQuality();
      expect(item.sellIn).toBe(-2);
    });

    it("quality never exceeds 50", () => {
      const item = new Item("Wedding Cake", 5, 50);
      new Shop([item]).updateQuality();
      expect(item.quality).toBe(50);
    });

    it("quality is capped at 50 with high-rate increases", () => {
      const item = new Item("Wedding Cake", 5, 48);
      new Shop([item]).updateQuality();
      expect(item.quality).toBe(50);
    });

    it("quality is capped at 50 with moderate-rate increases", () => {
      const item = new Item("Wedding Cake", 10, 49);
      new Shop([item]).updateQuality();
      expect(item.quality).toBe(50);
    });

    it("simulates a full run-up to the wedding", () => {
      const item = new Item("Wedding Cake", 15, 5);
      const shop = new Shop([item]);

      // Days 15-11: +1/day for 5 days = +5
      for (let i = 0; i < 5; i++) shop.updateQuality();
      expect(item.quality).toBe(10);
      expect(item.sellIn).toBe(10);

      // Days 10-6: +2/day for 5 days = +10
      for (let i = 0; i < 5; i++) shop.updateQuality();
      expect(item.quality).toBe(20);
      expect(item.sellIn).toBe(5);

      // Days 5-1: +3/day for 5 days = +15
      for (let i = 0; i < 5; i++) shop.updateQuality();
      expect(item.quality).toBe(35);
      expect(item.sellIn).toBe(0);

      // Day 0: quality drops to 0
      shop.updateQuality();
      expect(item.quality).toBe(0);
      expect(item.sellIn).toBe(-1);
    });
  });

  describe("multiple items", () => {
    it("updates all items in a single call", () => {
      const bread = new Item("Bread", 3, 10);
      const fruitCake = new Item("Fruit Cake", 3, 10);
      const sourdough = new Item("Sourdough Starter", 0, 80);
      const weddingCake = new Item("Wedding Cake", 8, 20);

      new Shop([bread, fruitCake, sourdough, weddingCake]).updateQuality();

      expect(bread.quality).toBe(9);
      expect(fruitCake.quality).toBe(11);
      expect(sourdough.quality).toBe(80);
      expect(weddingCake.quality).toBe(22);
    });
  });

  describe("return value", () => {
    it("returns the same items array", () => {
      const items = [new Item("Bread", 5, 10)];
      const result = new Shop(items).updateQuality();
      expect(result).toBe(items);
    });
  });
});
