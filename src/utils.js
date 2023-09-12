export const formatScore = (highScore) => {
    //checks if it is undefined or not
    if(highScore) {
        //if highscore is defined
        return (highScore / 1000);
    }
    return "(Play to find out)";
}
export default formatScore;