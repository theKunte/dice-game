import { useState, useEffect } from "react";

export default function ScoreCategory(props) {
  const [categoryScore, setCategoryScore] = useState(null);
  const [used, setUsed] = useState(false);
  const [description, setDiscription] = useState(true);

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

  return (
    <tbody>
      <tr className={rowClass} onClick={handleClick}>
        <td>
          <img className="upper-square" src={props.image} alt={props.alt}></img>
        </td>
        <td>description</td>

        <td>{used ? categoryScore : ""}</td>
      </tr>
    </tbody>
  );
}
