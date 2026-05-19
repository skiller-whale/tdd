import { Shop as OldShop } from "./OldShop.js";
import { Item } from "./Item.js";

class NewShop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (const item of this.items) {
      if (item.name === "Sourdough Starter") {
        // Legendary: quality and sellIn never change
      } else {
        new OldShop([item]).updateQuality();
      }
    }
    return this.items;
  }
}

export { NewShop, Item };
