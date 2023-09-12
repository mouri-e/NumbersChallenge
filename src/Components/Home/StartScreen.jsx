import { useEffect, useState } from 'react'
import './StartScreen.css'
import formatScore from '../../utils';

export const StartScreen = ({inputNumber, setInputNumber, highScore, setGameScreen}) => {
  const min = 2;
  const max = 100;

  const changeToInt = event => {
    const inputNumber = Number(event.target.value);
    setInputNumber(inputNumber);
  }

  const isGoodNumber = (inputNumber >= min && inputNumber <= max && inputNumber === Math.floor(inputNumber))
  
  

  /*This is a useful for manual testing (basically system.printLine)*/
  //useEffect(() => {console.log(isGoodNumber); console.log(inputNumber)}, [inputNumber]);

  return (
    <div>
      <h1>The Numbers Challenge Game</h1>
      <p>How many numbers would you like (MUST BE BETWEEN 2-100):</p>
      <label>
          <input type="number" name="Quantity of Numbers"
            value={inputNumber} onChange={changeToInt}>
          </input>
      </label>
      <br></br>
      <br></br>
      <button disabled={!isGoodNumber} onClick={setGameScreen}>Start</button>

      {inputNumber > 1 && inputNumber <= 100 && Number.isInteger(inputNumber) && <p>High Score: {formatScore(highScore)} seconds</p>}
      {
        //<p style={{ fontSize: "70px", cursor:"pointer", width: "30px", display : "inline-block"}}>high</p>
      }
    </div>
    
  )
}
export default StartScreen