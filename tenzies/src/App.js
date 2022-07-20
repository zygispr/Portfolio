import { useState, useEffect } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  // Dice state (value, held/not held):
  const [dice, setDice] = useState(allNewDice());

  // Tenzies game state (over/won, in progress/not won):
  const [tenzies, setTenzies] = useState(false);

  // Roll count state (number of rolls):
  const [rollCount, setRollCount] = useState(0);

  // Checks if the game is over:
  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const allEqual = dice.every((die) => die.value === dice[0].value);

    // If all dice are being held and they are of the same value, the game is won/over:
    if (allHeld && allEqual) {
      setTenzies(true);
    }
  }, [dice]);

  // This functions generates a new die:
  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  // This function generates 10 new dice (it runs when the app first loads and when the user wins the game and starts a new game):
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  // This functions is responsible for what happens after the user presses the "Roll" button (if the game is not yet over, pressing the button will generate a new die for each die that is not being held and increase the number of rolls by 1; if the game is over, pressing the button will generate a set of new random dice, reset the game state and the roll count):
  function rollDice() {
    if (!tenzies) {
      setDice((prevDice) =>
        prevDice.map((die) => (die.isHeld ? die : generateNewDie()))
      );
      setRollCount((prevRollCount) => prevRollCount + 1);
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setRollCount(0);
    }
  }

  // This function is responsible for setting the "isHeld" property:
  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      value={die.value}
      isHeld={die.isHeld}
      key={die.id}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="dice-roll" onClick={rollDice}>
        {tenzies ? "New game" : "Roll"}
      </button>
      <span className="rollcount">Number of rolls: {rollCount}</span>
    </main>
  );
}
