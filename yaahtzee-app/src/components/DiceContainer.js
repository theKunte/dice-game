import { useState, React } from "react";
import Die from "./Die";
import "../components/HomeView/styles.css";
import "./HomeView/styles.css";

function DiceContainer() {
  // Set up initial state for dice values and number of rolls remaining

  const [imageIndex, setImageIndex] = useState([0, 0, 0, 0, 0]);
  // heldDice is current State and setHeldDice is the function that allows to update the state
  const [heldDice, setHeldDice] = useState([false, false, false, false, false]);

  //The user should only be able to toll the dice 3 times total.
  //After the 3rd time the user has to select a field in the score board
  // const [rollsRemaining, setRollsRemaining] = useState(3);

  // function to roll the dice
  const rollDice = () => {
    // Generate random number
    //TODO:
    // Add condition in rollDice function =>
    // heldDie[index] ? doNothing() : getRandomNumber
    setImageIndex([
      getRandomNumber(),
      getRandomNumber(),
      getRandomNumber(),
      getRandomNumber(),
      getRandomNumber(),
    ]);
  };

  const holdDie = (index) => {
    console.log(index);
    const newArray = [...heldDice];
    newArray[index] = !heldDice[index];
    setHeldDice(newArray);
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
          <Die
            imageIndex={imageIndex[0]}
            clickDie={holdDie}
            held={heldDice[0]}
            dieIndex={0}
          />
          <Die
            imageIndex={imageIndex[1]}
            clickDie={holdDie}
            held={heldDice[1]}
            dieIndex={1}
          />
          <Die
            imageIndex={imageIndex[2]}
            clickDie={holdDie}
            held={heldDice[2]}
            dieIndex={2}
          />
          <Die
            imageIndex={imageIndex[3]}
            clickDie={holdDie}
            held={heldDice[3]}
            dieIndex={3}
          />
          <Die
            imageIndex={imageIndex[4]}
            clickDie={holdDie}
            held={heldDice[4]}
            dieIndex={4}
          />
        </div>
      </div>
    </div>
  );
}
export default DiceContainer;
