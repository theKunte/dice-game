import "./styles.css";
import React, { useEffect, useState } from "react";
import DiceImage1 from "../../images/Dice1.png";
import DiceImage2 from "../../images/Dice2.png";
import DiceImage3 from "../../images/Dice3.png";
import DiceImage4 from "../../images/Dice4.png";
import DiceImage5 from "../../images/Dice5.png";
import DiceImage6 from "../../images/Dice6.png";
import DiceContainer from "../DiceContainer";
import {
  scoreOnes,
  scoreTwos,
  scoreThree,
  scoreFours,
  scoreFives,
  scoreSixes,
  calculateUpperTotalSection,
  calculateUpperBonus,
  threeOfAKind,
  fourOfAKind,
  fullHouse,
  smallStraight,
  largeStraight,
  yahtzee,
  chance,
  calculateUpperTotalWithBonus,
  bonusYahtzee,
} from "../../ScoreItem";
import ScoreCategory from "../ScoreCategory";

function HomeView() {
  // Game state between Dice and Scoreboard
  const [diceValues, setDiceValues] = useState([0, 0, 0, 0, 0]);
  const [scores, setScores] = useState({
    ones: -1,
    twos: -1,
    threes: -1,
    fours: -1,
    fives: -1,
    sixes: -1,
    bonus: -1,
  });
  const updateDiceValues = (dieIndex, dieValue) => {
    diceValues[dieIndex] = dieValue;
  };

  const whenYouSelectTheScore = (category, score) => {
    const tempScore = { ...scores };
    tempScore[category] = score;
    setScores(tempScore);
    console.log(tempScore);

    if (
      tempScore.ones >= 0 &&
      tempScore.twos >= 0 &&
      tempScore.threes >= 0 &&
      tempScore.fours >= 0 &&
      tempScore.fives >= 0 &&
      tempScore.sixes >= 0 //when all upper sections scores are set calculate upper Bonus
    ) {
      const bonus = calculateUpperBonus(tempScore);
      const upperTotal = calculateUpperTotalSection(tempScore);
      const upperTotalWithBonus = calculateUpperTotalWithBonus(tempScore);

      tempScore["bonus"] = bonus;
      tempScore["upperTotal"] = upperTotal;
      tempScore["upperTotalWithBonus"] = upperTotalWithBonus;
    }

    setScores(tempScore);
  };
  return (
    <div className="main-view">
      <div className="game-score">
        <h1>This is the main Game view</h1>
        <div className="score-container">
          <div className="upper-score-view">
            <table>
              <tr>
                <th>
                  <mark>Upper Section</mark>
                </th>
                <th>
                  <mark>Score</mark>
                </th>
              </tr>
              <ScoreCategory
                category="ones"
                image={DiceImage1}
                scoreFunction={scoreOnes}
                diceValues={diceValues}
                alt="Score Category 1"
                whenYouSelectTheScore={whenYouSelectTheScore}
              />
              <ScoreCategory
                category="twos"
                image={DiceImage2}
                scoreFunction={scoreTwos}
                diceValues={diceValues}
                alt="Score Category 2"
                whenYouSelectTheScore={whenYouSelectTheScore}
              />
              <ScoreCategory
                category="threes"
                image={DiceImage3}
                scoreFunction={scoreThree}
                diceValues={diceValues}
                alt="Score Category 3"
                whenYouSelectTheScore={whenYouSelectTheScore}
              />
              <ScoreCategory
                category="fours"
                image={DiceImage4}
                scoreFunction={scoreFours}
                diceValues={diceValues}
                alt="Score Category 4"
                whenYouSelectTheScore={whenYouSelectTheScore}
              />
              <ScoreCategory
                category="fives"
                image={DiceImage5}
                scoreFunction={scoreFives}
                diceValues={diceValues}
                alt="Score Category 5"
                whenYouSelectTheScore={whenYouSelectTheScore}
              />
              <ScoreCategory
                category="sixes"
                image={DiceImage6}
                scoreFunction={scoreSixes}
                diceValues={diceValues}
                alt="Score Category 6"
                whenYouSelectTheScore={whenYouSelectTheScore}
              />
              <tr>
                <td>Total Score</td>
                <td>{scores.upperTotal}</td>
              </tr>
              <tr>
                <td>BONUS</td>
                <td>{scores.bonus}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>{scores.upperTotalWithBonus}</td>
              </tr>
            </table>
          </div>
          <div className="lower-score-view">
            <table id="upperScore">
              <tr>
                <th>
                  <mark>Lower Section</mark>
                </th>
                <th>
                  <mark>Score</mark>
                </th>
              </tr>
              <ScoreCategory
                // add image
                scoreFunction={threeOfAKind}
                diceValues={diceValues}
                alt="3 of A Kind"
                whenYouSelectTheScore={whenYouSelectTheScore}
              />
              <ScoreCategory
                // add image
                scoreFunction={fourOfAKind}
                diceValues={diceValues}
                alt="4 of A Kind"
                whenYouSelectTheScore={whenYouSelectTheScore}
              />
              <ScoreCategory
                // add image
                scoreFunction={fullHouse}
                diceValues={diceValues}
                alt="Full House"
                whenYouSelectTheScore={whenYouSelectTheScore}
              />
              <ScoreCategory
                // add image
                scoreFunction={smallStraight}
                diceValues={diceValues}
                alt="Small Straight"
                whenYouSelectTheScore={whenYouSelectTheScore}
              />
              <ScoreCategory
                // add image
                scoreFunction={largeStraight}
                diceValues={diceValues}
                alt="Large Straight"
                whenYouSelectTheScore={whenYouSelectTheScore}
              />
              <ScoreCategory
                // add image
                scoreFunction={yahtzee}
                diceValues={diceValues}
                alt="YAHTZEE"
                whenYouSelectTheScore={whenYouSelectTheScore}
              />
              <ScoreCategory
                // add image
                scoreFunction={chance}
                diceValues={diceValues}
                alt="Chance"
                whenYouSelectTheScore={whenYouSelectTheScore}
              />
              <tr>
                <td>BONUS YAHTZEE</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Total Score</td>
                <td>-</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <DiceContainer updateDiceValues={updateDiceValues} />
    </div>
  );
}

export default HomeView;
