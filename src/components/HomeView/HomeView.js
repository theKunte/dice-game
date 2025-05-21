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
  const [gameMode, setGameMode] = useState(null); // null, "single", or "multi"
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [playerScores, setPlayerScores] = useState([
    { ...initialScores },
    { ...initialScores },
  ]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const [rollButtonEnabled, setRollButtonEnabled] = useState(true);
  const [rollsRemaining, setRollsRemaining] = useState(3);
  const [turnsRemaining, setTurnsRemaining] = useState(3);
  const [heldDice, setHeldDice] = useState([false, false, false, false, false]);
  const [enableScoring, setEnableScoring] = useState(false);
  const [restartGame, setRestartGame] = useState(false);
  const [diceValues, setDiceValues] = useState([0, 0, 0, 0, 0]);

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

  const updateDiceValues = (dieIndex, dieValue) => {
    diceValues[dieIndex] = dieValue;
  };

  const whenYouSelectTheScore = (category, score) => {
    const updatedScores = [...playerScores];
    const tempScore = { ...updatedScores[currentPlayer] };
    tempScore[category] = score;

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
      tempScore["finished"] = true;
    }

    updatedScores[currentPlayer] = tempScore;
    setPlayerScores(updatedScores);

    if (
      (gameMode === "multi" &&
        updatedScores[0].finished &&
        updatedScores[1].finished) ||
      (gameMode === "single" && updatedScores[0].finished)
    ) {
      setGameOver(true);
      if (gameMode === "multi") {
        if (
          updatedScores[0].finalTotalScore > updatedScores[1].finalTotalScore
        ) {
          setWinner("Player 1");
        } else if (
          updatedScores[0].finalTotalScore < updatedScores[1].finalTotalScore
        ) {
          setWinner("Player 2");
        } else {
          setWinner("Tie");
        }
      } else {
        setWinner("You");
      }
    } else {
      if (gameMode === "multi") {
        setCurrentPlayer((prev) => (prev === 0 ? 1 : 0));
      }
      setRollButtonEnabled(true);
      setRollsRemaining(3);
      setTurnsRemaining(3);
      setEnableScoring(false);
      setHeldDice([false, false, false, false, false]);
      setRestartGame(false);
    }
  };

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

  const scores = playerScores[currentPlayer];

  // --- Game mode selection screen ---
  if (!gameMode) {
    return (
      <div
        className="container-fluid game-view"
        style={{ textAlign: "center", marginTop: 40 }}
      >
        <h1
          style={{
            fontFamily: "'Segoe UI', Arial, sans-serif",
            fontWeight: 700,
            fontSize: "2.8rem",
            color: "#2a5298",
            letterSpacing: "2px",
            marginBottom: "32px",
            textShadow: "1px 2px 8px #e0e7ef",
          }}
        >
          DICE GAME
        </h1>
        <div style={{ margin: "32px 0" }}>
          <button
            style={{
              padding: "18px 38px",
              fontSize: "1.25rem",
              margin: "0 18px",
              borderRadius: "16px",
              background: "linear-gradient(90deg, #2a5298 0%, #1e3c72 100%)",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              marginBottom: "18px",
              fontWeight: 600,
              boxShadow: "0 2px 12px rgba(42,82,152,0.13)",
              transition: "background 0.2s",
            }}
            onClick={() => setGameMode("single")}
          >
            🎲 Single Player
          </button>
          <button
            style={{
              padding: "18px 38px",
              fontSize: "1.25rem",
              margin: "0 18px",
              borderRadius: "16px",
              background: "linear-gradient(90deg, #c463b7 0%, #7a2a1e 100%)",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              marginBottom: "18px",
              fontWeight: 600,
              boxShadow: "0 2px 12px rgba(196,99,183,0.13)",
              transition: "background 0.2s",
            }}
            onClick={() => setGameMode("multi")}
          >
            👥 Two Player
          </button>
        </div>
        <div
          style={{
            color: "#2a5298",
            fontSize: "1.1rem",
            marginTop: "24px",
            opacity: 0.8,
          }}
        >
          Select a mode to start playing!
        </div>
      </div>
    );
  }

  return (
    <div
      className="container-fluid game-view"
      style={{ maxWidth: 950, margin: "0 auto" }}
    >
      <div
        className={`current-player-banner player-${currentPlayer + 1}-turn`}
        style={{
          marginTop: 18,
          marginBottom: 8,
          borderRadius: 12,
          fontSize: "1.2rem",
          boxShadow: "0 2px 8px rgba(42,82,152,0.08)",
        }}
      >
        {gameOver
          ? winner === "Tie"
            ? "🤝 It's a Tie!"
            : `🏆 Winner: ${winner}`
          : gameMode === "multi"
          ? `Player ${currentPlayer + 1}'s Turn`
          : "Your Turn"}
      </div>
      <h1
        style={{
          fontFamily: "'Segoe UI', Arial, sans-serif",
          fontWeight: 700,
          fontSize: "2.3rem",
          color: "#2a5298",
          letterSpacing: "2px",
          marginBottom: "18px",
          textShadow: "1px 2px 8px #e0e7ef",
        }}
      >
        DICE GAME
      </h1>
      <div
        className="scoreboard"
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "16px",
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
            padding: "8px 0 0 0",
            margin: 0,
            background: "#f8fbff",
            borderRadius: "16px 16px 8px 8px",
            boxShadow: "0 2px 10px rgba(42,82,152,0.07)",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1.13rem",
              color: "#2a5298",
              marginBottom: "6px",
              textAlign: "center",
              letterSpacing: "1px",
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
                <td colSpan="2" style={{ fontWeight: 600, color: "#2a5298" }}>
                  Total Score
                </td>
                <td>{scores.upperTotal}</td>
              </tr>
              <tr>
                <td colSpan="2" style={{ fontWeight: 600, color: "#2a5298" }}>
                  BONUS
                </td>
                <td>{scores.bonus}</td>
              </tr>
              <tr>
                <td colSpan="2" style={{ fontWeight: 600, color: "#2a5298" }}>
                  Total
                </td>
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
            padding: "8px 0 0 0",
            margin: 0,
            background: "#f8fbff",
            borderRadius: "16px 16px 8px 8px",
            boxShadow: "0 2px 10px rgba(42,82,152,0.07)",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1.13rem",
              color: "#2a5298",
              marginBottom: "6px",
              textAlign: "center",
              letterSpacing: "1px",
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
                <td colSpan="2" style={{ fontWeight: 600, color: "#2a5298" }}>
                  Total Score
                </td>
                <td>{scores.lowerTotal}</td>
              </tr>
              <tr>
                <td colSpan="2" style={{ fontWeight: 600, color: "#2a5298" }}>
                  FINAL Score
                </td>
                <td>{scores.finalTotalScore}</td>
              </tr>
            </tfoot>
          </table>
          <div>
            {gameOver && (
              <GameOverPopup
                reset={reset}
                score={
                  gameMode === "multi"
                    ? `P1: ${playerScores[0].finalTotalScore || 0} | P2: ${
                        playerScores[1].finalTotalScore || 0
                      }`
                    : `Your Score: ${playerScores[0].finalTotalScore || 0}`
                }
                winner={winner}
              />
            )}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 24 }}>
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
