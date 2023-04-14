const scoreValuesForUpperSection = (diceValues, numberToScore) => {
  let score = 0;
  for (let i = 0; i < diceValues.length; i++) {
    if ((diceValues[i] = numberToScore)) {
      score += diceValues[i];
    }
  }
  return score;
};

export const scoreOnes = (diceValues) => {
  return scoreValuesForUpperSection(diceValues, 1);
};

export const scoreTwos = (diceValues) => {
  return scoreValuesForUpperSection(diceValues, 2);
};
export const scoreThree = (diceValues) => {
  return scoreValuesForUpperSection(diceValues, 3);
};

export const scoreFours = (diceValues) => {
  return scoreValuesForUpperSection(diceValues, 4);
};

export const scoreFives = (diceValues) => {
  return scoreValuesForUpperSection(diceValues, 5);
};
export const scoreSixes = (diceValues) => {
  return scoreValuesForUpperSection(diceValues, 6);
};

export const threeOfAKind = (diceValues) => {};
export const fourOfAKind = (diceValues) => {};
export const fullHouse = (diceValues) => {};

export const smallStraight = (diceValues) => {};
export const largeStraight = (diceValues) => {};

export const yahtzee = (diceValues) => {};

export const chance = (diceValues) => {
  let score = 0;
  for (let i = 0; i < diceValues.length; i++) {
    score += diceValues[i];
  }
  return score;
};
