import { useEffect, useState } from 'react';
import './App.css';
import Playboard from './components/Playboard';
import DifficultySlider from './components/Slider';
import GameTitle from './components/Title';
import HighScore from './components/Highscore';

function App() {

  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [difficulty, setDifficulty] = useState(15);
 
  useEffect(() => {
    let intervalId = setTimeout(() => {
      setTimer(timer + 1);
    }, 1000);
    return () => clearTimeout(intervalId);
  }, [timer]);

  const handleDifficulty = (e) =>{
    setDifficulty(e.target.value);
  }

  const handleHighScore = () =>{
    let timeUsed = timer;
    let currentScore = score;
    let total = Math.round((currentScore * 100) / (timeUsed / 3));
    if(total !== Infinity) {
      setHighScore(total > highScore ? total : highScore);
    }
    setTimer(0);
    console.log(highScore);
  }

  return (
    <div className="App">
      <GameTitle/>
      <DifficultySlider difficulty={difficulty} handleDifficulty={handleDifficulty}/>
      <h2>Score: {score} / {difficulty} &nbsp; &nbsp;&nbsp;<span style={{fontSize: "32px"}}> Time used: {timer}s </span></h2>      
      <Playboard size={difficulty} score={score} setScore={setScore} handleHighScore={handleHighScore}/>
      <HighScore highScore={highScore}/>
    </div>
  );
}

export default App;
