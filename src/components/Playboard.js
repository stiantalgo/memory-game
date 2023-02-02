import React, { useState, useEffect } from 'react';

const Playboard = ({ size, score, setScore, handleHighScore }) => {
    const [pokemonData, setPokemonData] = useState([]);
    const [className, setClassName] = useState('card');
    const [loading, setLoading] = useState(true);
    const [shuffledCards, setShuffledCards] = useState([]);


    async function getData() {

        try {
            let url = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=32`);
            let data = await url.json();
            let pokeData = await Promise.all(data.results.map(async pokemon => {
                let pokeData = await fetch(pokemon.url);
                return await pokeData.json();
            }));
            setPokemonData(pokeData);
    
            setShuffledCards(Array.from({ length: size }, (_, i) => ({
            image: pokemonData[i] ? pokemonData[i].sprites.other.dream_world.front_default : '',
            clicks: 0,
            name: pokemonData[i] ? pokemonData[i].name : '',            
            })));
            
        } catch (error) {
            console.log(error)
        }
        console.log("HM");
    }

    useEffect(() => {
        getData();
      }, [size]);

    useEffect(() => {
        getData().then(() => setLoading(false));
    }, [loading]);

    useEffect(() => {
        setTimeout(() => {
            setClassName('card');
        }, 350);        
    },[className])

    useEffect(() => {
        shuffleIt();
    },[pokemonData]);


    const handleClick = (index) =>{
        let old = [...shuffledCards];
        if(old[index].clicks < 1){
            old[index].clicks++;
            setScore(score+1)
        }else{
            console.log("You failed");
            resetCards();
            setScore(0);
        }
        shuffleIt();
        setClassName('card cardAnim');
    }

    const shuffleIt=()=>{
        let unshuf = [...shuffledCards];
        let shuffy = unshuf.sort(() => 0.5 - Math.random());
        setShuffledCards(shuffy);
    }

    const resetCards = () =>{
        let old = [...shuffledCards];
        old.forEach(card => card.clicks =0 )
        setShuffledCards(old);
        handleHighScore();
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="playBoard">
            {shuffledCards.map((card, index) => (
                <div className={className} key={index} onClick={() => handleClick(index)}>
                    <img src={card.image || '../media/placeholder.png'} alt={card.name} />
                    {/* <p>{card.name}</p> */}
                </div>
            ))}
        </div>
    );
};

export default Playboard;