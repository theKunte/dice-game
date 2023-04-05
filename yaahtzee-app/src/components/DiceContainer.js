import { useState, React } from "react";
import Die from "./Die";
import "../components/HomeView/styles.css";

function DiceContainer() {
  const [diceValues, setDiceValues] = useState([0, 0, 0, 0, 0]);

  const rollDice = () => {
    // Generate random number
    setDiceValues([
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
          <Die diceValue={diceValues[0]} />
          <Die diceValue={diceValues[1]} />
          <Die diceValue={diceValues[2]} />
          <Die diceValue={diceValues[3]} />
          <Die diceValue={diceValues[4]} />
        </div>
      </div>
    </div>
  );
}
export default DiceContainer;
