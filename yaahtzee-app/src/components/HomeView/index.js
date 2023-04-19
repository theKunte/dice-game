import "./styles.css";
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
          <div className="upper-score-view">
            <table>
              <tr>
                <th>
                  <mark>Upper Section</mark>
                </th>
                <th>
                  <mark>Score</mark>
                </th>
              </tr>
              <tr>
                <td>
                  <img className="upper-square" src={DiceImage1} alt="1"></img>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <img className="upper-square" src={DiceImage2} alt="2"></img>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <img className="upper-square" src={DiceImage3} alt="3"></img>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <img className="upper-square" src={DiceImage4} alt="4"></img>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <img className="upper-square" src={DiceImage5} alt="5"></img>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <img className="upper-square" src={DiceImage6} alt="6"></img>
                </td>
                <td></td>
              </tr>
              <tr>
                <td>Total Score</td>
                <td></td>
              </tr>
              <tr>
                <td>Bonus</td>
                <td></td>
              </tr>
              <tr>
                <td>Total</td>
                <td></td>
              </tr>
            </table>
          </div>
          <div className="lower-score-view">
            <table>
              <tr>
                <th>
                  <mark>Lower Section</mark>
                </th>
                <th>
                  <mark>Score</mark>
                </th>
              </tr>
              <tr>
                <td>3 Of A Kind</td>
                <td></td>
              </tr>
              <tr>
                <td>4 Of A Kind</td>
                <td></td>
              </tr>
              <tr>
                <td>Full House</td>
                <td></td>
              </tr>
              <tr>
                <td>SM Straight</td>
                <td></td>
              </tr>
              <tr>
                <td>LG Straight</td>
                <td></td>
              </tr>
              <tr>
                <td>YAHTZEE</td>
                <td></td>
              </tr>
              <tr>
                <td>CHANCE</td>
                <td></td>
              </tr>
              <tr>
                <td>BONUS YAHTZEE</td>
                <td></td>
              </tr>
              <tr>
                <td>Total Score</td>
                <td></td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <DiceContainer />
    </div>
  );
}

export default HomeView;
