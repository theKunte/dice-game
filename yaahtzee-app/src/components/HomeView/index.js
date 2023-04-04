import "./index.css";
import React from "react";
import { useState } from "react";

import DiceImage1 from "../../images/Dice1.png";
import DiceImage2 from "../../images/Dice2.png";
import DiceImage3 from "../../images/Dice3.png";
import DiceImage4 from "../../images/Dice4.png";
import DiceImage5 from "../../images/Dice5.png";
import DiceImage6 from "../../images/Dice6.png";

function HomeView() {
  var diceImages = [
    DiceImage1,
    DiceImage2,
    DiceImage3,
    DiceImage4,
    DiceImage5,
    DiceImage6,
  ];
  const [image1, setNewImage1] = useState(diceImages[0]);
  const [image2, setNewImage2] = useState(diceImages[1]);
  const [image3, setNewImage3] = useState(diceImages[2]);
  const [image4, setNewImage4] = useState(diceImages[3]);
  const [image5, setNewImage5] = useState(diceImages[4]);

  const rollDice = () => {
    // Generate random number
    var randomNum1 = Math.floor(Math.random() * 6);
    var randomNum2 = Math.floor(Math.random() * 6);
    var randomNum3 = Math.floor(Math.random() * 6);
    var randomNum4 = Math.floor(Math.random() * 6);
    var randomNum5 = Math.floor(Math.random() * 6);
    setNewImage1(diceImages[randomNum1]);
    setNewImage2(diceImages[randomNum2]);
    setNewImage3(diceImages[randomNum3]);
    setNewImage4(diceImages[randomNum4]);
    setNewImage5(diceImages[randomNum5]);
  };

  return (
    <div className="main-view">
      <div className="game-score">
        <h1>This is the main Game view</h1>
        <div className="score-container">
          <div className="lower-score-view">
            <img className="lower-square" src={DiceImage1} alt="1"></img>
            <img className="lower-square" src={DiceImage2} alt="2"></img>
            <img className="lower-square" src={DiceImage3} alt="3"></img>
            <img className="lower-square" src={DiceImage4} alt="4"></img>
            <img className="lower-square" src={DiceImage5} alt="5"></img>
            <img className="lower-square" src={DiceImage6} alt="6"></img>
          </div>
          <div className="upper-score-view">
            <p> test upper score</p>
          </div>
        </div>
      </div>

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

export default HomeView;
