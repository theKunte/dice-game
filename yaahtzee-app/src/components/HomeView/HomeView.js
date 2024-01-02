import "./styles.css";
import React, { useState } from "react";
import DiceImage1 from "../../images/Dice1.png";
import DiceImage2 from "../../images/Dice2.png";
import DiceImage3 from "../../images/Dice3.png";
import DiceImage4 from "../../images/Dice4.png";
import DiceImage5 from "../../images/Dice5.png";
import DiceImage6 from "../../images/Dice6.png";
import ThreeOfAKind from "../../images/threeOfAKind.jpeg";
import FourOfAKind from "../../images/fourOfAKind.jpeg";
import Chance from "../../images/chance.jpeg";
import SmallStraight from "../../images/small.jpeg";
import LargeStraight from "../../images/large.jpeg";
import Yahtzee from "../../images/yahtzee.jpeg";
import FullHouse from "../../images/fullHouse.png";
import GameOverPopup from "../GameOverPopup";
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
  calculateLowerTotal,
  calculateBonusYahtzee,
} from "../../ScoreItem";
import ScoreCategory from "../ScoreCategory";

function HomeView() {
  // Game state between Dice and Scoreboard
  const [rollButtonEnabled, setRollButtonEnabled] = useState(true);
  const [rollsRemaining, setRollsRemaining] = useState(3);
  const [turnsRemaining, setTurnsRemaining] = useState(3);
  const [heldDice, setHeldDice] = useState([false, false, false, false, false]);
  const [gameOver, setGameOver] = useState(false);
  const [enableScoring, setEnableScoring] = useState(false);
  const [restartGame, setRestartGame] = useState(false);

  const [diceValues, setDiceValues] = useState([0, 0, 0, 0, 0]);
  const [scores, setScores] = useState({
    ones: -1,
    twos: -1,
    threes: -1,
    fours: -1,
    fives: -1,
    sixes: -1,
    bonus: -1,
    threeOfAKind: -1,
    fourOfAKind: -1,
    fullHouse: -1,
    smallStraight: -1,
    largeStraight: -1,
    yahtzee: -1,
    chance: -1,
    bonusYahtzee: 0,
  });

  const reset = () => {
    setRestartGame(false);
    setScores({}); // Reset scores object to an empty object
    setGameOver(false); // Reset game over state to false
    setRollButtonEnabled(true);
    setRollsRemaining(3);
    setTurnsRemaining(3);
    setEnableScoring(false);
    setHeldDice([false, false, false, false, false]);
    setRestartGame(true);
  };

  const updateDiceValues = (dieIndex, dieValue) => {
    diceValues[dieIndex] = dieValue;
  };

  const whenYouSelectBonusYahtzee = () => {
    if (scores.yahtzee >= 0 && scores.bonusYahtzee === -1) {
      // Update condition
      let score = calculateBonusYahtzee(scores, diceValues);
      setScores({ ...scores, bonusYahtzee: score });
    }
  };
  const whenYouSelectTheScore = (category, score) => {
    const tempScore = { ...scores };
    tempScore[category] = score;

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
    if (
      tempScore.threeOfAKind >= 0 &&
      tempScore.fourOfAKind >= 0 &&
      tempScore.smallStraight >= 0 &&
      tempScore.largeStraight >= 0 &&
      tempScore.fullHouse >= 0 &&
      tempScore.chance >= 0 &&
      tempScore.yahtzee >= 0 &&
      tempScore.bonusYahtzee >= 0
    ) {
      const lowerTotal = calculateLowerTotal(tempScore);

      tempScore["lowerTotal"] = lowerTotal;
    }
    if (
      tempScore.ones >= 0 &&
      tempScore.twos >= 0 &&
      tempScore.threes >= 0 &&
      tempScore.fours >= 0 &&
      tempScore.fives >= 0 &&
      tempScore.sixes >= 0 &&
      tempScore.threeOfAKind >= 0 &&
      tempScore.fourOfAKind >= 0 &&
      tempScore.smallStraight >= 0 &&
      tempScore.largeStraight >= 0 &&
      tempScore.fullHouse >= 0 &&
      tempScore.chance >= 0 &&
      tempScore.yahtzee >= 0
    ) {
      const lowerTotal = calculateLowerTotal(tempScore);
      const upperTotalWithBonus = calculateUpperTotalWithBonus(tempScore);
      const finalTotalScore = lowerTotal + upperTotalWithBonus;

      tempScore["lowerTotal"] = lowerTotal;
      tempScore["finalTotalScore"] = finalTotalScore;
      setGameOver(true);
    }

    setScores(tempScore);
    setRollButtonEnabled(true);
    setRollsRemaining(3);
    setTurnsRemaining(3);
    setEnableScoring(false);
    setHeldDice([false, false, false, false, false]);
    setRestartGame(false);
  };

  return (
    <div className="container-fluid game-view">
      <h1> Player 1 </h1>
      <div className="scoreboard">
        <div className="upper-score">
          <table className="table">
            <thead>
              <tr>
                <th>Upper Section</th>
                <th>Score</th>
              </tr>
            </thead>
            <ScoreCategory
              category="ones"
              image={DiceImage1}
              scoreFunction={scoreOnes}
              diceValues={diceValues}
              alt="Score Category 1"
              whenYouSelectTheScore={whenYouSelectTheScore}
              enableScoring={enableScoring}
              restartGame={restartGame}
            />
            <ScoreCategory
              category="twos"
              image={DiceImage2}
              scoreFunction={scoreTwos}
              text={"Once"}
              diceValues={diceValues}
              alt="Score Category 2"
              whenYouSelectTheScore={whenYouSelectTheScore}
              enableScoring={enableScoring}
              restartGame={restartGame}
            />
            <ScoreCategory
              category="threes"
              image={DiceImage3}
              scoreFunction={scoreThree}
              diceValues={diceValues}
              alt="Score Category 3"
              whenYouSelectTheScore={whenYouSelectTheScore}
              enableScoring={enableScoring}
              restartGame={restartGame}
            />
            <ScoreCategory
              category="fours"
              image={DiceImage4}
              scoreFunction={scoreFours}
              diceValues={diceValues}
              alt="Score Category 4"
              whenYouSelectTheScore={whenYouSelectTheScore}
              enableScoring={enableScoring}
              restartGame={restartGame}
            />
            <ScoreCategory
              category="fives"
              image={DiceImage5}
              scoreFunction={scoreFives}
              diceValues={diceValues}
              alt="Score Category 5"
              whenYouSelectTheScore={whenYouSelectTheScore}
              enableScoring={enableScoring}
              restartGame={restartGame}
            />
            <ScoreCategory
              category="sixes"
              image={DiceImage6}
              scoreFunction={scoreSixes}
              diceValues={diceValues}
              alt="Score Category 6"
              whenYouSelectTheScore={whenYouSelectTheScore}
              enableScoring={enableScoring}
              restartGame={restartGame}
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

        <div className="lower-score">
          <table className="table">
            <thead>
              <tr>
                <th>Lower Section</th>
                <th>Score</th>
              </tr>
            </thead>
            <ScoreCategory
              category={"threeOfAKind"}
              image={ThreeOfAKind}
              scoreFunction={threeOfAKind}
              diceValues={diceValues}
              alt="3 of A Kind"
              whenYouSelectTheScore={whenYouSelectTheScore}
              enableScoring={enableScoring}
              restartGame={restartGame}
            />
            <ScoreCategory
              category={"fourOfAKind"}
              image={FourOfAKind}
              scoreFunction={fourOfAKind}
              diceValues={diceValues}
              alt="4 of A Kind"
              whenYouSelectTheScore={whenYouSelectTheScore}
              enableScoring={enableScoring}
              restartGame={restartGame}
            />
            <ScoreCategory
              category={"fullHouse"}
              image={FullHouse}
              scoreFunction={fullHouse}
              diceValues={diceValues}
              alt="Full House"
              whenYouSelectTheScore={whenYouSelectTheScore}
              enableScoring={enableScoring}
              restartGame={restartGame}
            />
            <ScoreCategory
              category={"smallStraight"}
              image={SmallStraight}
              scoreFunction={smallStraight}
              diceValues={diceValues}
              alt="Small Straight"
              whenYouSelectTheScore={whenYouSelectTheScore}
              enableScoring={enableScoring}
              restartGame={restartGame}
            />
            <ScoreCategory
              category={"largeStraight"}
              image={LargeStraight}
              scoreFunction={largeStraight}
              diceValues={diceValues}
              alt="Large Straight"
              whenYouSelectTheScore={whenYouSelectTheScore}
              enableScoring={enableScoring}
              restartGame={restartGame}
            />
            <ScoreCategory
              category={"yahtzee"}
              image={Yahtzee}
              scoreFunction={yahtzee}
              diceValues={diceValues}
              alt="YAHTZEE"
              whenYouSelectTheScore={whenYouSelectTheScore}
              enableScoring={enableScoring}
              restartGame={restartGame}
            />
            <ScoreCategory
              category={"chance"}
              image={Chance}
              scoreFunction={chance}
              diceValues={diceValues}
              alt="Chance"
              whenYouSelectTheScore={whenYouSelectTheScore}
              enableScoring={enableScoring}
              restartGame={restartGame}
            />
            {/* TODO: fix Bonus Yathzee and final score category */}
            {/* <div onClick={whenYouSelectBonusYahtzee}>
              <tr>
                <td>BONUS YAHTZEE</td>
              </tr>
              <td>{scores.bonusYahtzee}</td>
            </div> */}
            <tr>
              <td>Total Score</td>
              <td>{scores.lowerTotal}</td>
            </tr>
            <tr>
              <td>FINAL Score</td>
              <td>{scores.finalTotalScore}</td>
            </tr>
          </table>
          <div>
            {gameOver && (
              <GameOverPopup reset={reset} score={scores.finalTotalScore} />
            )}
          </div>
        </div>
      </div>
      <div>
        <DiceContainer
          rollButtonEnabled={rollButtonEnabled}
          setRollButtonEnabled={setRollButtonEnabled}
          turnsRemaining={turnsRemaining}
          setTurnsRemaining={setTurnsRemaining}
          updateDiceValues={updateDiceValues}
          rollsRemaining={rollsRemaining}
          setRollsRemaining={setRollsRemaining}
          setEnableScoring={setEnableScoring}
          heldDice={heldDice}
          setHeldDice={setHeldDice}
        />
      </div>
    </div>
  );
}

export default HomeView;
