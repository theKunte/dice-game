import React from "react";

const GameOverPopup = ({ reset, score }) => {
  return (
    <div className="game-over-popup container-sm">
      <h2>Game Over</h2>
      <p>Your Score: {score}</p>
      <button onClick={reset}>Restart Game</button>
    </div>
  );
};

export default GameOverPopup;
