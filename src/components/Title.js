const GameTitle = ({name}) =>{
    return(
        <div className="gameTitle" style={{marginBottom: "20px"}}>
            <h1>{name || "Pokèmon"} Memory Game</h1>
        </div>
    )
}

export default GameTitle;