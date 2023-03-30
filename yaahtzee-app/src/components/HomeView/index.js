import "./index.css";
import React from "react";
import DiceImage1 from "../../images/Dice1.png";

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
        </div>
      </div>
    </div>
  );
};

export default HomeView;
