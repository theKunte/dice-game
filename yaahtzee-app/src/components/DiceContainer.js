import { useState, React, useEffect } from "react";
import Die from "./Die";
import "../components/HomeView/styles.css";
import "./HomeView/styles.css";

function DiceContainer(props) {
  const [imageIndex, setImageIndex] = useState([0, 0, 0, 0, 0]);
  // heldDice is current State and setHeldDice is the function that allows to update the state
  //The user should only be able to toll the dice 3 times total.
  //After the 3rd time the user has to select a field in the score board

  useEffect(() => {
    if (props.rollsRemaining === 0) {
      props.setRollButtonEnabled(false);
    }
  }, [props.rollsRemaining]);

  useEffect(() => {
    if (props.turnsRemaining === 0) {
      props.setTurnsRemaining(false);
    }
  }, [props.turnsRemaining]);

  // function to roll the dice
  const rollDice = () => {
    if (props.rollsRemaining > 0 && props.turnsRemaining > 0) {
      const newImageIndex = [...imageIndex];
      for (let i = 0; i < props.heldDice.length; i++) {
        if (!props.heldDice[i]) {
          newImageIndex[i] = getRandomNumber();
        }
      }
      setImageIndex(newImageIndex);
      props.setRollsRemaining(props.rollsRemaining - 1);
      props.setTurnsRemaining(props.turnsRemaining - 1);
      props.setEnableScoring(true);
    }
  };

  const holdDie = (index) => {
    const newArray = [...props.heldDice];
    newArray[index] = !props.heldDice[index];
    props.setHeldDice(newArray);
  };

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 6);
  };

  return (
    <div>
      <div className="roll-dice-btn">
        <div class="d-flex justify-content-center mb-3">
          <button
            type="button"
            onClick={rollDice}
            disabled={!props.rollButtonEnabled}
            class="btn btn-success"
          >
            {props.rollsRemaining === 0
              ? "No rolls remaining"
              : `Roll Dice (${props.turnsRemaining} turn${
                  props.turnsRemaining === 1 ? "" : "s"
                } left)`}
          </button>
        </div>
      </div>
      <div className="dice">
        {props.rollsRemaining < 3 && (
          <div class="row">
            <div class="col">
              <Die
                imageIndex={imageIndex[0]}
                updateDiceValues={props.updateDiceValues}
                handleClickDie={holdDie}
                held={props.heldDice[0]}
                dieIndex={0}
              />
            </div>
            <div class="col">
              <Die
                imageIndex={imageIndex[1]}
                updateDiceValues={props.updateDiceValues}
                handleClickDie={holdDie}
                held={props.heldDice[1]}
                dieIndex={1}
              />
            </div>
            <div class="col">
              <Die
                imageIndex={imageIndex[2]}
                updateDiceValues={props.updateDiceValues}
                handleClickDie={holdDie}
                held={props.heldDice[2]}
                dieIndex={2}
              />
            </div>
            <div class="col">
              <Die
                imageIndex={imageIndex[3]}
                updateDiceValues={props.updateDiceValues}
                handleClickDie={holdDie}
                held={props.heldDice[3]}
                dieIndex={3}
              />
            </div>
            <div class="col">
              <Die
                imageIndex={imageIndex[4]}
                updateDiceValues={props.updateDiceValues}
                handleClickDie={holdDie}
                held={props.heldDice[4]}
                dieIndex={4}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default DiceContainer;
