import React from "react";

const GameOverPopup = ({ score, onPlayAgain }) => {
  return (
    <div className="game-over-popup">
      <h2>Game Over</h2>
      <p>Your Score: {score}</p>
      {/* TODO: Fix reset logic  */}
      <button onClick={onPlayAgain}>Play Again</button>
    </div>
  );
};

export default GameOverPopup;
