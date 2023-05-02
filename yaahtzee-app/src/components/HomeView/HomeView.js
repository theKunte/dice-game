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
              <tr>
                <td>Bonus</td>
                <td>-</td>
              </tr>
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
              <tr>
                <td>3 Of A Kind</td>
                <td id="scoreThreeOfAKind">-</td>
              </tr>
              <tr>
                <td>4 Of A Kind</td>
                <td id="scoreFourOfAKind">-</td>
              </tr>
              <tr>
                <td>Full House</td>
                <td id="scoreFullHouse">-</td>
              </tr>
              <tr>
                <td>SM Straight</td>
                <td id="scoreSmallStraight">-</td>
              </tr>
              <tr>
                <td>LG Straight</td>
                <td id="scoreLargeStraight">-</td>
              </tr>
              <tr>
                <td>YAHTZEE</td>
                <td id="scoreYahtzee">-</td>
              </tr>
              <tr>
                <td>CHANCE</td>
                <td id="scoreChanceScore">-</td>
              </tr>
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
