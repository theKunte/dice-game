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

const initialScores = {
  ones: -1,
  twos: -1,
  threes: -1,
  fours: -1,
  fives: -1,
  sixes: -1,
  bonus: -1,
  upperTotal: 0,
  upperTotalWithBonus: 0,
  threeOfAKind: -1,
  fourOfAKind: -1,
  fullHouse: -1,
  smallStraight: -1,
  largeStraight: -1,
  yahtzee: -1,
  chance: -1,
  bonusYahtzee: 0,
  lowerTotal: 0,
  finalTotalScore: 0,
};

function HomeView() {
  // 2 Player State
  const [currentPlayer, setCurrentPlayer] = useState(0); // 0: Player 1, 1: Player 2
  const [playerScores, setPlayerScores] = useState([
    { ...initialScores },
    { ...initialScores },
  ]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  // Game state between Dice and Scoreboard
  const [rollButtonEnabled, setRollButtonEnabled] = useState(true);
  const [rollsRemaining, setRollsRemaining] = useState(3);
  const [turnsRemaining, setTurnsRemaining] = useState(3);
  const [heldDice, setHeldDice] = useState([false, false, false, false, false]);
  const [enableScoring, setEnableScoring] = useState(false);
  const [restartGame, setRestartGame] = useState(false);
  const [diceValues, setDiceValues] = useState([0, 0, 0, 0, 0]);

  // Reset game for both players
  const reset = () => {
    setRestartGame(false);
    setPlayerScores([{ ...initialScores }, { ...initialScores }]);
    setGameOver(false);
    setWinner(null);
    setCurrentPlayer(0);
    setRollButtonEnabled(true);
    setRollsRemaining(3);
    setTurnsRemaining(3);
    setEnableScoring(false);
    setHeldDice([false, false, false, false, false]);
    setRestartGame(true);
  };

  // Update dice values
  const updateDiceValues = (dieIndex, dieValue) => {
    diceValues[dieIndex] = dieValue;
  };

  // Handle scoring for current player
  const whenYouSelectTheScore = (category, score) => {
    const updatedScores = [...playerScores];
    const tempScore = { ...updatedScores[currentPlayer] };
    tempScore[category] = score;

    // Calculate upper section
    if (
      tempScore.ones >= 0 &&
      tempScore.twos >= 0 &&
      tempScore.threes >= 0 &&
      tempScore.fours >= 0 &&
      tempScore.fives >= 0 &&
      tempScore.sixes >= 0
    ) {
      const bonus = calculateUpperBonus(tempScore);
      const upperTotal = calculateUpperTotalSection(tempScore);
      const upperTotalWithBonus = calculateUpperTotalWithBonus(tempScore);

      tempScore["bonus"] = bonus;
      tempScore["upperTotal"] = upperTotal;
      tempScore["upperTotalWithBonus"] = upperTotalWithBonus;
    }
    // Calculate lower section
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
    // Check if player finished all categories
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
      tempScore["finished"] = true;
    }

    updatedScores[currentPlayer] = tempScore;
    setPlayerScores(updatedScores);

    // Check if both players finished
    if (updatedScores[0].finished && updatedScores[1].finished) {
      setGameOver(true);
      if (updatedScores[0].finalTotalScore > updatedScores[1].finalTotalScore) {
        setWinner("Player 1");
      } else if (
        updatedScores[0].finalTotalScore < updatedScores[1].finalTotalScore
      ) {
        setWinner("Player 2");
      } else {
        setWinner("Tie");
      }
    } else {
      // Switch player
      setCurrentPlayer((prev) => (prev === 0 ? 1 : 0));
      setRollButtonEnabled(true);
      setRollsRemaining(3);
      setTurnsRemaining(3);
      setEnableScoring(false);
      setHeldDice([false, false, false, false, false]);
      setRestartGame(false);
    }
  };

  // Handle bonus yahtzee (if needed)
  const whenYouSelectBonusYahtzee = () => {
    const updatedScores = [...playerScores];
    const tempScore = { ...updatedScores[currentPlayer] };
    if (tempScore.yahtzee >= 0 && tempScore.bonusYahtzee === -1) {
      let score = calculateBonusYahtzee(tempScore, diceValues);
      tempScore.bonusYahtzee = score;
      updatedScores[currentPlayer] = tempScore;
      setPlayerScores(updatedScores);
    }
  };

  // Get current player's scores
  const scores = playerScores[currentPlayer];

  return (
    <div className="container-fluid game-view">
      <div className={`current-player-banner player-${currentPlayer + 1}-turn`}>
        {gameOver
          ? winner === "Tie"
            ? "It's a Tie!"
            : `Winner: ${winner}`
          : `Player ${currentPlayer + 1}'s Turn`}
      </div>
      <h1>DICE GAME</h1>
      <div
        className="scoreboard"
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "8px",
          width: "100%",
          justifyContent: "center",
          alignItems: "flex-start",
          flexWrap: "wrap",
          padding: 0,
          margin: 0,
        }}
      >
        <div
          className="upper-score"
          style={{
            flex: 1,
            minWidth: 0,
            maxWidth: "420px",
            padding: 0,
            margin: 0,
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1.1rem",
              color: "#2a5298",
              marginBottom: "6px",
              textAlign: "center",
            }}
          >
            Upper Section
          </div>
          <table className="table" style={{ margin: 0, padding: 0 }}>
            <tbody>
              <ScoreCategory
                category="ones"
                image={DiceImage1}
                scoreFunction={scoreOnes}
                diceValues={diceValues}
                alt="Score Category 1"
                whenYouSelectTheScore={whenYouSelectTheScore}
                enableScoring={enableScoring}
                restartGame={restartGame}
                score={scores.ones}
                currentPlayer={currentPlayer}
              />
              <ScoreCategory
                category="twos"
                image={DiceImage2}
                scoreFunction={scoreTwos}
                diceValues={diceValues}
                alt="Score Category 2"
                whenYouSelectTheScore={whenYouSelectTheScore}
                enableScoring={enableScoring}
                restartGame={restartGame}
                score={scores.twos}
                currentPlayer={currentPlayer}
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
                score={scores.threes}
                currentPlayer={currentPlayer}
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
                score={scores.fours}
                currentPlayer={currentPlayer}
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
                score={scores.fives}
                currentPlayer={currentPlayer}
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
                score={scores.sixes}
                currentPlayer={currentPlayer}
              />
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">Total Score</td>
                <td>{scores.upperTotal}</td>
              </tr>
              <tr>
                <td colSpan="2">BONUS</td>
                <td>{scores.bonus}</td>
              </tr>
              <tr>
                <td colSpan="2">Total</td>
                <td>{scores.upperTotalWithBonus}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div
          className="lower-score"
          style={{
            flex: 1,
            minWidth: 0,
            maxWidth: "420px",
            padding: 0,
            margin: 0,
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1.1rem",
              color: "#2a5298",
              marginBottom: "6px",
              textAlign: "center",
            }}
          >
            Lower Section
          </div>
          <table className="table" style={{ margin: 0, padding: 0 }}>
            <tbody>
              <ScoreCategory
                category={"threeOfAKind"}
                image={ThreeOfAKind}
                scoreFunction={threeOfAKind}
                diceValues={diceValues}
                alt="3 of A Kind"
                whenYouSelectTheScore={whenYouSelectTheScore}
                enableScoring={enableScoring}
                restartGame={restartGame}
                score={scores.threeOfAKind}
                currentPlayer={currentPlayer}
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
                score={scores.fourOfAKind}
                currentPlayer={currentPlayer}
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
                score={scores.fullHouse}
                currentPlayer={currentPlayer}
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
                score={scores.smallStraight}
                currentPlayer={currentPlayer}
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
                score={scores.largeStraight}
                currentPlayer={currentPlayer}
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
                score={scores.yahtzee}
                currentPlayer={currentPlayer}
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
                score={scores.chance}
                currentPlayer={currentPlayer}
              />
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">Total Score</td>
                <td>{scores.lowerTotal}</td>
              </tr>
              <tr>
                <td colSpan="2">FINAL Score</td>
                <td>{scores.finalTotalScore}</td>
              </tr>
            </tfoot>
          </table>
          <div>
            {gameOver && (
              <GameOverPopup
                reset={reset}
                score={`P1: ${playerScores[0].finalTotalScore || 0} | P2: ${
                  playerScores[1].finalTotalScore || 0
                }`}
                winner={winner}
              />
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
