import { useState } from "react";

export default function ScoreCategory(props) {
  const [categoryScore, setCategoryScore] = useState(null);
  const [used, setUsed] = useState(false);

  const handleClick = () => {
    if (!used) {
      const score = props.scoreFunction(props.diceValues);
      setCategoryScore(score);
      setUsed(true);
      props.whenYouSelectTheScore(props.category, score);
    }
  };

  const rowClass = used ? "selected" : "";

  return (
    <tbody>
      <tr className={rowClass} onClick={handleClick}>
        <td>
          <img className="upper-square" src={props.image} alt={props.alt}></img>
        </td>
        <td>{used ? categoryScore : ""}</td>
      </tr>
    </tbody>
  );
}
