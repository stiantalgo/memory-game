const HighScore = ({highScore}) => {

    return(
        <div className="highScore" style={{marginTop: "20px"}}>
            <h3>Best Highscore: {highScore || 0}</h3>
        </div>
    )
}

export default HighScore;