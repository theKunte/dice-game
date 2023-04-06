import { useState, React } from "react";
import Die from "./Die";
import "../components/HomeView/styles.css";
import "./HomeView/styles.css";

function DiceContainer() {
  // Set up initial state for dice values and number of rolls remaining

  const [imageIndex, setImageIndex] = useState([0, 0, 0, 0, 0]);
  const [rollsRemaining, setRollsRemaining] = useState(3);

  // function to roll the dice
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

  const holdDie = (index) => {
    // setHeldDice([//set correct index of this shit array ])
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
          <Die
            imageIndex={imageIndex[0]}
            held={heldDice[0]}
            onClick={holdDie}
          />
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
