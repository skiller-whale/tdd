# Shop: Exercises

## The Story

The Bun & Board is a small bakery in a prominent market town, run by a friendly baker named Allison.
The shop sells high quality baked goods that, unfortunately, degrade in value as they approach their sell-by dates.

A previous developer named Leeroy wrote the inventory management system before leaving for new opportunities.

Here is the specification for the existing system:

- All items have a `sellIn` value which denotes the number of days we have left to sell the item.
- All items have a `quality` value which denotes how valuable the item is.
- At the end of each day, the system updates both values for every item.

Pretty simple, right? Well, this is where it gets interesting:

- Once the sell-by date has passed, quality degrades twice as fast.
- The quality of an item is never negative.
- **Fruit Cake** actually increases in quality the older it gets.
- **Sourdough Starter** is a legendary item and never has to be sold or decreases in quality.
- **Wedding Cake**, like Fruit Cake, increases in quality as the wedding approaches:
  - quality increases by 2 when there are 10 days or less to the wedding,
  - by 3 when there are 5 days or less,
  - and quality drops to 0 after the wedding has passed.
- The quality of an item is never more than 50, except for **Sourdough Starter** whose quality is always 80.

Leeroy has also asked us not to alter the `Item` class or `items` property — the previous team was very protective of their code.

## Run tests once

```bash
bun test
```

## Run tests in watch mode

```bash
bun test --watch
```

---

Based on the [Gilded Rose Refactoring Kata](https://github.com/emilybache/GildedRose-Refactoring-Kata) by Emily Bache, originally created by Terry Hughes.
