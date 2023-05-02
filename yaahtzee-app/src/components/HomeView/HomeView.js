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
  calculateUpperTotal,
  calculateUpperBonus,
  threeOfAKind,
  fourOfAKind,
  fullHouse,
  smallStraight,
  largeStraight,
  yahtzee,
  chance,
} from "../../ScoreItem";
import ScoreCategory from "../ScoreCategory";

function HomeView() {
  // Game state between Dice and Scoreboard
  const [diceValues, setDiceValues] = useState([0, 0, 0, 0, 0]);

  const updateDiceValues = (dieIndex, dieValue) => {
    diceValues[dieIndex] = dieValue;
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
                image={DiceImage1}
                scoreFunction={scoreOnes}
                diceValues={diceValues}
                alt="Score Category 1"
              />
              <ScoreCategory
                image={DiceImage2}
                scoreFunction={scoreTwos}
                diceValues={diceValues}
                alt="Score Category 2"
              />
              <ScoreCategory
                image={DiceImage3}
                scoreFunction={scoreThree}
                diceValues={diceValues}
                alt="Score Category 3"
              />
              <ScoreCategory
                image={DiceImage4}
                scoreFunction={scoreFours}
                diceValues={diceValues}
                alt="Score Category 4"
              />
              <ScoreCategory
                image={DiceImage5}
                scoreFunction={scoreFives}
                diceValues={diceValues}
                alt="Score Category 5"
              />
              <ScoreCategory
                image={DiceImage6}
                scoreFunction={scoreSixes}
                diceValues={diceValues}
                alt="Score Category 6"
              />
              <tr>
                <td>Total Score</td>
                <td>-</td>
              </tr>
              <ScoreCategory
                // add image
                scoreFunction={calculateUpperBonus}
                diceValues={diceValues}
                alt="Upper Bonus?"
              />
              <tr>
                <td>Total</td>
                <td>-</td>
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
              />
              <ScoreCategory
                // add image
                scoreFunction={fourOfAKind}
                diceValues={diceValues}
                alt="4 of A Kind"
              />
              <ScoreCategory
                // add image
                scoreFunction={fullHouse}
                diceValues={diceValues}
                alt="Full House"
              />
              <ScoreCategory
                // add image
                scoreFunction={smallStraight}
                diceValues={diceValues}
                alt="Small Straight"
              />
              <ScoreCategory
                // add image
                scoreFunction={largeStraight}
                diceValues={diceValues}
                alt="Large Straight"
              />
              <ScoreCategory
                // add image
                scoreFunction={yahtzee}
                diceValues={diceValues}
                alt="YAHTZEE"
              />
              <ScoreCategory
                // add image
                scoreFunction={chance}
                diceValues={diceValues}
                alt="Chance"
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
