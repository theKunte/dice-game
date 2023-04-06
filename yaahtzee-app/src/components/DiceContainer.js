import { useState, React } from "react";
import Die from "./Die";
import "../components/HomeView/styles.css";

function DiceContainer() {
  const [imageIndex, setImageIndex] = useState([0, 0, 0, 0, 0]);

  const rollDice = () => {
    // Generate random number
    setImageIndex([
      getRandomNumber(),
      getRandomNumber(),
      getRandomNumber(),
      getRandomNumber(),
      getRandomNumber(),
    ]);
  };
  const getRandomNumber = () => {
    return Math.floor(Math.random() * 6);
  };
  const [heldDice, setHeldDice] = useState([false, false, false, false, false]);

  return (
    <div>
      <div className="roll-dice-bottom-view">
        <div className="roll-dice-button">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={rollDice}
          >
            Roll Dice
          </button>
        </div>
      </div>
      <div className="dice-view">
        <p>The Dice will be here</p>
        <div className="container">
          <Die imageIndex={imageIndex[0]} />
          <Die imageIndex={imageIndex[1]} />
          <Die imageIndex={imageIndex[2]} />
          <Die imageIndex={imageIndex[3]} />
          <Die imageIndex={imageIndex[4]} />
        </div>
      </div>
    </div>
  );
}
export default DiceContainer;
