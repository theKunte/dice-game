import "./index.css";
import React from "react";
import DiceImage1 from "../../images/Dice1.png";
import DiceImage2 from "../../images/Dice2.png";
import DiceImage3 from "../../images/Dice3.png";
import DiceImage4 from "../../images/Dice4.png";
import DiceImage5 from "../../images/Dice5.png";

const HomeView = () => {
  return (
    <div className="main-view">
      <div className="game-score">
        <h1>This is the main Game view</h1>
        <div className="lower-score-view">
          <p>test lower score</p>
        </div>
        <div className="upper-score-view">
          <p> test upper score</p>
        </div>
      </div>
      <div className="roll-dice-bottom-view">
        <div className="roll-dice-button">
          <button>Button</button>
        </div>
      </div>
      <div className="dice-view">
        <p>The Dice will be here</p>
        <div className="container">
          <img className="square" src={DiceImage1} alt="1"></img>
          <div style={{ width: "5px", display: "inline-block" }}></div>
          <img className="square" src={DiceImage2} alt="2"></img>
          <div style={{ width: "5px", display: "inline-block" }}></div>
          <img className="square" src={DiceImage3} alt="1"></img>
          <div style={{ width: "5px", display: "inline-block" }}></div>
          <img className="square" src={DiceImage4} alt="1"></img>
          <div style={{ width: "5px", display: "inline-block" }}></div>
          <img className="square" src={DiceImage5} alt="1"></img>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
