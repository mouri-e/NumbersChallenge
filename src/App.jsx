import { useEffect, useState } from 'react'
import './App.css'
import {StartScreen} from './Components/Home/StartScreen'
import {PlayingScreen} from './Components/Playing/PlayingScreen'
import {EndScreen} from './Components/End/EndScreen'

//Each of the game screens
const GameState = {
    HOMESCREEN: 0,
    PLAYINGSCREEN: 1,
    ENDSCREEN: 2
}

export const App = () => {
  const min = 2;
  const max = 100;

  const [inputNumber, setInputNumber] = useState(2);
  const [highScore, setHighScore] = useState({});
  const [gameScreen, setGameScreen] = useState(GameState.HOMESCREEN);
  const [currentScore, setCurrentScore] = useState(undefined);
  

  /*This is a useful for manual testing (basically system.printLine)*/
  //useEffect(() => {console.log(isGoodNumber); console.log(inputNumber)}, [inputNumber]);

  return (
    //ternary operator
    //             boolean              ?      value/what to do
    gameScreen === GameState.HOMESCREEN ? 
    <StartScreen 
        inputNumber={inputNumber} 
        setInputNumber={setInputNumber} 
        highScore={highScore[inputNumber]} 
        setGameScreen={() => setGameScreen(GameState.PLAYINGSCREEN)}
    />
    //else = ":" ie -> : do this
    : gameScreen === GameState.PLAYINGSCREEN ? 
    <PlayingScreen 
        inputNumber={inputNumber}
        //sets highscore for each input number specifically
        highScore={highScore[inputNumber]}
        //func        parameter   lambda             copy of obj   # of nums played   your time
        setHighScore={(timePlayed) => {
          //the current score is how fast you played this round
          setCurrentScore(timePlayed);
          //if this is your fastest round update your high score
          setHighScore({...highScore, [inputNumber] : Math.min(timePlayed, (highScore[inputNumber] || Number.MAX_VALUE))});
          }
        }//End of setHighScore
        //changes to end screen upon call
        setGameScreen={() => setGameScreen(GameState.ENDSCREEN)}
    /> 
    : 
    <EndScreen
        highScore={highScore[inputNumber]}
        currentScore = {currentScore}
        setGameScreen={() => setGameScreen(GameState.HOMESCREEN)}
    />
      

    
    
  )
}
