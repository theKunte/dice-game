import "./index.css";
import React from "react";
import DiceImage1 from "../../images/Dice1.png";
import DiceImage2 from "../../images/Dice2.png";
import DiceImage3 from "../../images/Dice3.png";
import DiceImage4 from "../../images/Dice4.png";
import DiceImage5 from "../../images/Dice5.png";
import DiceImage6 from "../../images/Dice6.png";
import DiceContainer from "../DiceContainer";

function HomeView() {
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
      <DiceContainer />
    </div>
  );
}

export default HomeView;
