// Test functions for ScoreItems.

import { fullHouse, scoreFours } from "./ScoreItem.js";
import { smallStraight, largeStraight } from "./ScoreItem.js";
import { yahtzee, chance } from "./ScoreItem.js";
import { scoreOnes } from "./ScoreItem.js";
import { scoreTwos } from "./ScoreItem.js";
import { scoreThree } from "./ScoreItem.js";
import { scoreFives } from "./ScoreItem.js";
import { scoreSixes } from "./ScoreItem.js";

// Upper Section Test 1-6

// Ones Test
describe("scoreOnes", () => {
  it("calculates the score for Ones correctly", () => {
    const diceValues = [1, 1, 2, 3, 4];
    const result = scoreOnes(diceValues);
    expect(result).toEqual(2);
  });

  it("returns 0 if no Ones are rolled", () => {
    const diceValues = [2, 3, 4, 5, 6];
    const result = scoreOnes(diceValues);
    expect(result).toEqual(0);
  });
});

// Twos test
describe("scoreTwos", () => {
  it("calculates the score for Twos correctly", () => {
    const diceValues = [1, 1, 2, 3, 4];
    const result = scoreTwos(diceValues);
    expect(result).toEqual(2);
  });

  it("caluclates the score for Twos are rolled", () => {
    const diceValues = [2, 2, 2, 5, 6];
    const result = scoreTwos(diceValues);
    expect(result).toEqual(6);
  });

  it("caluclates 0 if no Twos are rolled", () => {
    const diceValues = [3, 3, 1, 5, 6];
    const result = scoreTwos(diceValues);
    expect(result).toEqual(0);
  });
});

// Three Test
describe("scoreThrees", () => {
  it("calculates the score for Three correctly", () => {
    const diceValues = [1, 1, 3, 3, 1];
    const result = scoreThree(diceValues);
    expect(result).toEqual(6);
  });

  it("returns 0 if no Three are rolled", () => {
    const diceValues = [2, 2, 2, 5, 6];
    const result = scoreThree(diceValues);
    expect(result).toEqual(0);
  });
});

// Fours Test
describe("scoreFours", () => {
  it("calculates the score for Four correctly", () => {
    const diceValues = [4, 4, 4, 4, 1];
    const result = scoreFours(diceValues);
    expect(result).toEqual(16);
  });

  it("returns 0 if no Four are rolled", () => {
    const diceValues = [2, 2, 2, 5, 6];
    const result = scoreFours(diceValues);
    expect(result).toEqual(0);
  });
});

// Fives Test
describe("scoreFives", () => {
  it("calculates the score for Fives correctly", () => {
    const diceValues = [5, 5, 5, 5, 1];
    const result = scoreFives(diceValues);
    expect(result).toEqual(20);
  });

  it("returns 0 if no Four are rolled", () => {
    const diceValues = [2, 2, 2, 3, 6];
    const result = scoreFives(diceValues);
    expect(result).toEqual(0);
  });
});

// Sizes Test
describe("scoreSixes", () => {
  it("calculates the score for Fives correctly", () => {
    const diceValues = [5, 6, 6, 5, 1];
    const result = scoreSixes(diceValues);
    expect(result).toEqual(12);
  });

  it("returns 0 if no Four are rolled", () => {
    const diceValues = [2, 1, 2, 3, 4];
    const result = scoreSixes(diceValues);
    expect(result).toEqual(0);
  });
});
//Lower Section Tests

// Full House
describe("fullHouse", () => {
  test("should correctly calculate the score for a full house", () => {
    const diceValues = [2, 2, 3, 3, 3];
    const expectedScore = 25; // There are two 2's and three 3's in the array, so the expected score is 25.

    const actualScore = fullHouse(diceValues);

    expect(actualScore).toEqual(expectedScore);
  });

  test("second correctly calculate the score for a full house", () => {
    const diceValues = [5, 5, 3, 3, 3];
    const expectedScore = 25; // There are two 2's and three 3's in the array, so the expected score is 25.

    const actualScore = fullHouse(diceValues);

    expect(actualScore).toEqual(expectedScore);
  });

  test("should return 0 when there is no full house", () => {
    const diceValues = [1, 1, 2, 3, 4];
    const expectedScore = 0; // There is no full house in the array, so the expected score is 0.

    const actualScore = fullHouse(diceValues);

    expect(actualScore).toEqual(expectedScore);
  });

  test("should return 0 when there is only one kind of value", () => {
    const diceValues = [2, 2, 2, 2, 2];
    const expectedScore = 0; // There is no full house in the array, so the expected score is 0.

    const actualScore = fullHouse(diceValues);

    expect(actualScore).toEqual(expectedScore);
  });
});

// Small Straight
describe("smallStraight", () => {
  test("should correctly calculate the score for a small straight", () => {
    const diceValues = [1, 2, 3, 4, 6];
    const expectedScore = 30; // The dice values form a small straight, so the expected score is 30.

    const actualScore = smallStraight(diceValues);

    expect(actualScore).toEqual(expectedScore);
  });

  test("should return 0 when there is no small straight", () => {
    const diceValues = [1, 2, 3, 5, 6];
    const expectedScore = 0; // The dice values do not form a small straight, so the expected score is 0.

    const actualScore = smallStraight(diceValues);

    expect(actualScore).toEqual(expectedScore);
  });
});

// Large Straight
describe("largeStraight", () => {
  test("should correctly calculate the score for a large straight", () => {
    const diceValues = [1, 2, 3, 4, 5];
    const expectedScore = 40; // The dice values form a large straight, so the expected score is 40.

    const actualScore = largeStraight(diceValues);

    expect(actualScore).toEqual(expectedScore);
  });

  test("should return 0 when there is no large straight", () => {
    const diceValues = [1, 2, 3, 4, 6];
    const expectedScore = 0; // The dice values do not form a large straight, so the expected score is 0.

    const actualScore = largeStraight(diceValues);

    expect(actualScore).toEqual(expectedScore);
  });

  test("should return 0 when there are duplicate values", () => {
    const diceValues = [1, 2, 3, 3, 5];
    const expectedScore = 0; // The dice values have duplicate values, so the expected score is 0.

    const actualScore = largeStraight(diceValues);

    expect(actualScore).toEqual(expectedScore);
  });
});

describe("yahtzee", () => {
  it("returns 50 when all dice values are the same", () => {
    const diceValues = [6, 6, 6, 6, 6];
    const result = yahtzee(diceValues);
    expect(result).toEqual(50);
  });

  it("returns 0 when not all dice values are the same", () => {
    const diceValues = [1, 2, 3, 4, 5];
    const result = yahtzee(diceValues);
    expect(result).toEqual(0);
  });
});

describe("chance", () => {
  it("returns the sum of all dice values", () => {
    const diceValues = [1, 2, 3, 4, 5];
    const result = chance(diceValues);
    expect(result).toEqual(15);
  });
  it("2 returns the sum of all dice values", () => {
    const diceValues = [2, 4, 4, 5, 5];
    const result = chance(diceValues);
    expect(result).toEqual(20);
  });
});
