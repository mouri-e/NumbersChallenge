import { useEffect, useState } from 'react'
import './PlayingScreen.css'
import formatScore from '../../utils'

export const PlayingScreen = ({inputNumber, highScore, setHighScore, setGameScreen}) => {

  const [listOfNumbers, setListNumbers] = useState([]);
  const [lastIndex, setLastIndex] = useState(0);
  const [timeStarted, setTimeStarted] = useState(Date.now());
  const secondsSinceStarted = Date.now() - timeStarted;

  //generates a random position on the screen for a number to be spawned
  const posnGenerator = (index) => {
    const numberObject = {
      posX : Math.floor((Math.random()*(window.innerWidth - 100)) + 50),
      posY : Math.floor((Math.random()*(window.innerHeight - 150)) + 100),
      //indexing is zero based
      value : index + 1,
      color : `rgb(${rgbGenerator()}, ${rgbGenerator()}, ${rgbGenerator()})`
    }
    return numberObject;
  }

  //generate a random rgb value
  const rgbGenerator = () => Math.floor(Math.random() * 256);

  //check if nextNumber collides with anything on screen (in numsArray)
  const collides = (numsArray, nextNumber) => numsArray.reduce((numCollidedBoolean, currentNumberInArray) => (numCollidedBoolean || 
  ((Math.abs(nextNumber.posX - currentNumberInArray.posX) < 75) && (Math.abs(nextNumber.posY - currentNumberInArray.posY) < 75))), false);

  const generatePositions = () => {
    const numsArray = [...listOfNumbers];
    //    0        =   0
    let nextIndex = lastIndex;

    //while there aren't 10 numbers on the screen AND the next number is 
          // less than equal to how many numbers user selected (zero indexing)
    while(numsArray.length < 10 && nextIndex <= inputNumber - 1) {
      let number = posnGenerator(nextIndex);

      //keep rerolling positions until nothing collides
      while(collides(numsArray, number)) {
        number = posnGenerator(nextIndex);
      }

      //adding the number to the array
      numsArray.push(number);
      //update the index to create the next number in array
      nextIndex++;
    }

    //End the game ie there is nothing left to click
    if (numsArray.length === 0){
      //The time you have been playing this round
      setHighScore(Date.now() - timeStarted);
      //Go to end screen
      setGameScreen();
    }
    //update what the last thing in the array is
    setLastIndex(nextIndex);
    //update the list of numbers being worked with to just 10 current numbers
    setListNumbers(numsArray);
  };

  //   run   this function      when this changes
  useEffect(generatePositions, [listOfNumbers]);

  //FIFO
  const clickHandler = ()=> {
    //create a copy of array
    const copyOfCurrentNumbers = [...listOfNumbers];
    //remove the first element in the array
    copyOfCurrentNumbers.shift();
    //This changes list of numbers which triggers the useEffect to add the next number
    setListNumbers(copyOfCurrentNumbers);
  }


  return (
    <div>
      <p>High Score: {formatScore(highScore)} seconds</p>
      <p>Current Time: {(secondsSinceStarted / 1000).toFixed(3)} seconds</p>
      {listOfNumbers.map((numberObject, index) => {
        const numberStyle = {
          display: "inline-block",
          fontSize: "60px", 
          color: numberObject.color,
          cursor: index === 0 ? "pointer" : "default", 
          width: "50px",
          position: "absolute",
          left: `${numberObject.posX}px`,
          top: `${numberObject.posY}px`
        }
        return <div style={numberStyle} onClick={index===0 ? clickHandler : undefined}>{numberObject.value}</div>;
      }
      )//END OF MAP FUNCTION
      }
    </div>
    
  )
}
export default PlayingScreen