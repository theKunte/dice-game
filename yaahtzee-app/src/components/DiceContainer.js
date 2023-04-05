import { useState, React } from "react";

import DiceImage1 from "../images/Dice1.png";
import DiceImage2 from "../images/Dice2.png";
import DiceImage3 from "../images/Dice3.png";
import DiceImage4 from "../images/Dice4.png";
import DiceImage5 from "../images/Dice5.png";
import DiceImage6 from "../images/Dice6.png";

function DiceContainer() {
  var diceImages = [
    DiceImage1,
    DiceImage2,
    DiceImage3,
    DiceImage4,
    DiceImage5,
    DiceImage6,
  ];

  const [image1, setNewImage1] = useState(diceImages[0]);
  const [image2, setNewImage2] = useState(diceImages[0]);
  const [image3, setNewImage3] = useState(diceImages[0]);
  const [image4, setNewImage4] = useState(diceImages[0]);
  const [image5, setNewImage5] = useState(diceImages[0]);

  const rollDice = () => {
    // Generate random number
    setNewImage1(getRandomDice());
    setNewImage2(getRandomDice());
    setNewImage3(getRandomDice());
    setNewImage4(getRandomDice());
    setNewImage5(getRandomDice());
  };

  const getRandomDice = () => {
    return diceImages[Math.floor(Math.random() * 6)];
  };

  return (
    <div>
      <div className="roll-dice-bottom-view">
        <div className="roll-dice-button">
          <button
            type="button"
            class="btn btn-outline-primary"
            onClick={rollDice}
          >
            Roll Dice
          </button>
        </div>
      </div>
      <div className="dice-view">
        <p>The Dice will be here</p>
        <div className="container">
          <img className="square" src={image1} alt="1"></img>
          <div style={{ width: "5px", display: "inline-block" }}></div>
          <img className="square" src={image2} alt="2"></img>
          <div style={{ width: "5px", display: "inline-block" }}></div>
          <img className="square" src={image3} alt="3"></img>
          <div style={{ width: "5px", display: "inline-block" }}></div>
          <img className="square" src={image4} alt="4"></img>
          <div style={{ width: "5px", display: "inline-block" }}></div>
          <img className="square" src={image5} alt="5"></img>
        </div>
      </div>
    </div>
  );
}
export default DiceContainer;
