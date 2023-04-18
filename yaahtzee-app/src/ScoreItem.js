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

export const xOfAKind = (diceValues, x) => {
  // [5,1,5,2,5]
  let score = 0;
  let counts = {};
  let isXOfAKind = false;
  for (let i = 0; i < diceValues.length; i++) {
    score += diceValues[i];

    if (counts[diceValues[i]]) {
      counts[diceValues[i]] += 1;
    } else {
      counts[diceValues[i]] = 1;
    }
    if (counts[diceValues[i]] === x) {
      isXOfAKind = true;
    }
  }
  if (isXOfAKind) return score;
  else return 0;
};
export const threeOfAKind = (diceValues) => {
  return xOfAKind(diceValues, 3);
};

export const fourOfAKind = (diceValues) => {
  return xOfAKind(diceValues, 4);
};
export const fullHouse = (diceValues) => {};

export const smallStraight = (diceValues) => {};
export const largeStraight = (diceValues) => {};

export const yahtzee = (diceValues) => {
  // Lets check if all values in the array are the same
  const firstValue = diceValues[0];
  const allSame = diceValues.every((value) => value === firstValue);
  if (allSame) {
    // if all values are the same return yathzee score
    return 50;
  } else {
    return 0;
  }
};

export const chance = (diceValues) => {
  let score = 0;
  for (let i = 0; i < diceValues.length; i++) {
    score += diceValues[i];
  }
  return score;
};
