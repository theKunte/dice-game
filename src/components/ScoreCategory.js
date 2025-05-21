import { useEffect } from "react";

const categoryDescriptions = {
  ones: "Once",
  twos: "Twos",
  threes: "Threes",
  fours: "Fours",
  fives: "Fives",
  sixes: "Sixes",
  threeOfAKind: "3 of a Kind",
  fourOfAKind: "Four of a Kind",
  fullHouse: "Full House",
  smallStraight: "Small Straight",
  largeStraight: "Large Straight",
  yahtzee: "Yahtzee",
  chance: "Chance",
};

export default function ScoreCategory(props) {
  useEffect(() => {
    if (props.restartGame === true) {
      // No local state to reset
    }
  }, [props.restartGame]);

  const handleClick = () => {
    if (props.enableScoring === false) return;
    if (props.score === -1) {
      setScore();
    }
  };
  const setScore = () => {
    const score = props.scoreFunction(props.diceValues);
    props.whenYouSelectTheScore(props.category, score);
  };

  // Assign color class based on current player
  // Expecting props.currentPlayer (0 or 1) to be passed from HomeView
  let playerClass = "";
  if (props.currentPlayer === 0) playerClass = "scorecat-player1";
  if (props.currentPlayer === 1) playerClass = "scorecat-player2";

  const rowClass = (props.score !== -1 ? "selected " : "") + playerClass;
  const description = categoryDescriptions[props.category] || "";

  return (
    <tr className={rowClass} onClick={handleClick}>
      <td>
        <img className="upper-square" src={props.image} alt={props.alt}></img>
      </td>
      <td>{description}</td>
      <td>{props.score !== -1 ? props.score : ""}</td>
    </tr>
  );
}
