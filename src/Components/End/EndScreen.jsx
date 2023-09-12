import './EndScreen.css'
import formatScore from '../../utils'

export const EndScreen = ({setGameScreen, highScore, currentScore}) => {


    return (
        <div>
            <p>High Score: {formatScore(highScore)} seconds</p>
            <p>Your Time: {formatScore(currentScore)} seconds</p>
            <button onClick={setGameScreen}>Play Again</button>
        </div>
    );

}
export default EndScreen