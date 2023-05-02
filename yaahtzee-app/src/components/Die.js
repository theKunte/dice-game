import DiceImage1 from "../images/Dice1.png";
import DiceImage2 from "../images/Dice2.png";
import DiceImage3 from "../images/Dice3.png";
import DiceImage4 from "../images/Dice4.png";
import DiceImage5 from "../images/Dice5.png";
import DiceImage6 from "../images/Dice6.png";
import { useState, useEffect } from "react";

function Die(props) {
  const diceImages = [
    DiceImage1,
    DiceImage2,
    DiceImage3,
    DiceImage4,
    DiceImage5,
    DiceImage6,
  ];

  const [image, setImage] = useState(diceImages[0]);
  const [value, setValue] = useState();
  const [holdDice, setholdDice] = useState(false);

  useEffect(() => {
    setImage(diceImages[props.imageIndex]);
    setValue(props.imageIndex + 1);
  }, [props.imageIndex]);

  useEffect(() => {
    props.updateDiceValues(props.dieIndex, value);
  }, [value]);

  useEffect(() => {
    setholdDice(props.held);
  }, [props.held]);

  return (
    <div
      className="square"
      onClick={() => props.handleClickDie(props.dieIndex)}
    >
      <div className="container">
        <img
          className={holdDice ? "held-die" : "normal"}
          src={image}
          alt="dice"
        ></img>
        <p>{value}</p>
        <div style={{ width: "5px", display: "inline-block" }}></div>
      </div>
    </div>
  );
}

export default Die;
