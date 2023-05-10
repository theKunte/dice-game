// Upper Score
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

const scoreValuesForUpperSection = (diceValues, numberToScore) => {
  let score = 0;
  for (let i = 0; i < diceValues.length; i++) {
    if (diceValues[i] === numberToScore) {
      // use triple equals operator to check equality
      score += diceValues[i];
    }
  }
  return score;
};

export const calculateLowerTotal = (scores) => {
  let totalLower = 0;
  totalLower += scores.threeOfAKind;
  totalLower += scores.fourOfAKind;
  totalLower += scores.fullHouse;
  totalLower += scores.smallStraight;
  totalLower += scores.largeStraight;
  totalLower += scores.yahtzee;
  totalLower += scores.chance;
  totalLower += scores.bonusYahtzee;

  return totalLower;
};

export const calculateUpperTotalSection = (scores) => {
  let totalUpper = 0;
  totalUpper += scores.ones;
  totalUpper += scores.twos;
  totalUpper += scores.threes;
  totalUpper += scores.fours;
  totalUpper += scores.fives;
  totalUpper += scores.sixes;
  return totalUpper;
};

export const calculateUpperBonus = (scores) => {
  let total = calculateUpperTotalSection(scores);

  return total >= 63 ? 35 : 0;
};

export const calculateUpperTotalWithBonus = (scores) => {
  return calculateUpperBonus(scores) + calculateUpperTotalSection(scores);
};

// Lower Score

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

export const fullHouse = (diceValues) => {
  const counts = {};
  for (let i = 0; i < diceValues.length; i++) {
    counts[diceValues[i]] = (counts[diceValues[i]] || 0) + 1;
  }
  const countsValues = Object.values(counts);
  if (
    countsValues.length === 2 &&
    countsValues.includes(2) &&
    countsValues.includes(3)
  ) {
    return 25;
  } else {
    return 0;
  }
};

export const smallStraight = (diceValues) => {
  const sortedDice = diceValues.sort((a, b) => a - b);
  const uniqueDice = [...new Set(sortedDice)];
  const isSmallStraight =
    uniqueDice.some((value, index) => value + 1 === uniqueDice[index + 1]) &&
    uniqueDice
      .slice(0, 3)
      .every((value, index) => value + 1 === uniqueDice[index + 1]);
  return isSmallStraight ? 30 : 0;
};
export const largeStraight = (diceValues) => {
  const uniqueDice = [...new Set(diceValues)];
  if (uniqueDice.length !== 5) return 0;
  const sortedDice = uniqueDice.sort((a, b) => a - b);
  if (sortedDice[4] - sortedDice[0] === 4) {
    return 40;
  }
  return 0;
};

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
  console.log(score);
  return score;
};

//TODO: Fix calculate Bonus Yahtzee
export const bonusYahtzee = () => {};
//if yahtzee occured add bonus points
// if yahtzee has been crossed out no bonus option
// will have to add useState to keep track if a catergory has been crossed out
