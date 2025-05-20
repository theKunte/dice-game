import { useState, useEffect } from "react";

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
  const [categoryScore, setCategoryScore] = useState(null);
  const [used, setUsed] = useState(false);

  useEffect(() => {
    if (props.restartGame === true) {
      setCategoryScore(null);
      setUsed(false);
    }
  }, [props.restartGame]);

  const handleClick = () => {
    if (props.enableScoring === false) return;
    if (!used) {
      setScore();
    }
  };
  const setScore = () => {
    const score = props.scoreFunction(props.diceValues);
    setCategoryScore(score);
    setUsed(true);
    props.whenYouSelectTheScore(props.category, score);
  };

  const rowClass = used ? "selected" : "";
  const description = categoryDescriptions[props.category] || "";

  return (
    <tbody>
      <tr className={rowClass} onClick={handleClick}>
        <td>
          <img className="upper-square" src={props.image} alt={props.alt}></img>
        </td>
        <td>{description}</td>
        <td>{used ? categoryScore : ""}</td>
      </tr>
    </tbody>
  );
}
