

const DifficultySlider = ({difficulty, handleDifficulty}) => {

    return(
        <div className="slideContainer" style={{display: "flex", gap: "20px", marginBottom: "80px"}}>
            <p>Difficulty slider:</p>
            <input className="mySlider" type="range" min="8" max="30" value={difficulty} onChange={handleDifficulty} />
        </div>
    )
}

export default DifficultySlider;