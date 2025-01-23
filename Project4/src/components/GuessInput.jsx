
import '../styles/GuessInput.css'
import React, { useContext } from 'react';
import App, { AppContext } from '../App';
import { useState, useEffect } from 'react';

const GuessInput = () => {
  const {guess} = useContext(AppContext);
  const {setGuess} = useContext(AppContext);

  //pokemon info
  const {currentPokemon} = useContext(AppContext);
  const {setCurrentPokemon} = useContext(AppContext);
  const {pokeID} = useContext(AppContext);
  const {setPokeID} = useContext(AppContext);
  const {pokeList} = useContext(AppContext);
  const {setAfterImg} = useContext(AppContext);
  const {oldPoke} = useContext(AppContext);
  const {setOldPoke} = useContext(AppContext);
  const {oldID} = useContext(AppContext);
  const {setOldID} = useContext(AppContext);

  //game button and game states
  const {setResetGame} = useContext(AppContext);
  const {resetGame} = useContext(AppContext);
  const {newGame} = useContext(AppContext);
  const {setNewGame} = useContext(AppContext);
  const {next} = useContext(AppContext);
  const {setNext} = useContext(AppContext);
  //setting ball states 
  const {setFirstBall} = useContext(AppContext);
  const {firstBall} = useContext(AppContext);
  const {setSecBall} = useContext(AppContext);
  const {secBall} = useContext(AppContext);
  const {setThirdBall} = useContext(AppContext);
  const {thirdBall} = useContext(AppContext);

  //function for submitting 
  const onSubmit = () =>{

    //check if blank do nothing 
    if(guess.trim() === ""){
      console.log("no input nothing done");
    }
    else if(guess === currentPokemon){ //if guess correct
      console.log("correct guess");
      //if the last guess pokemon
      if(pokeID === 10){
        setNewGame(true);
      }
      //image handling 
      setAfterImg(true);

     
      setNext(true);
  
    }
    else{
      console.log("incorrect guess: ");
      //first check if first ball is true 
      if(firstBall){
        setFirstBall(false);
      }else if(secBall){
        setSecBall(false);
      }else if(thirdBall){
        setThirdBall(false); //game is over 
        setNewGame(true); //used to show newGameButton
      }
    }
    setGuess(''); //resets to blank input
  }
   //function for new game 
   const newGameButton = () =>{
    setPokeID(1);
    setCurrentPokemon("Pikachu");
    setAfterImg(false);
    setNext(false);
    setNewGame(false);
    setFirstBall(true);
    setSecBall(true);
    setThirdBall(true);
  }

  //function for next button 
  const nextButton = () =>{
     setAfterImg(false);
     //going to the next Pokemon on list
     const currentId = pokeID;
     const newID = currentId+1;
     setPokeID(newID);
     setCurrentPokemon(pokeList[newID]); //set equal to string of new one 


    
  }
  //makes sure pokemon info updated before continuing
  useEffect(() => {
    console.log("new ID: ", pokeID, "new poke: ", currentPokemon);
    setNext(false);
  }, [pokeID, currentPokemon]); 

  //makes sure pokeid restarts before continute after start new game 
  


  console.log("guess ", guess); //checking if input good
  return (
    <div id='guess-input'>
      <input
      type = "text"
      value = {guess}
      onChange={(e) => {setGuess(e.target.value)}}
      required
      />
      {/*make buttons conditional */}
      {newGame ? (<button onClick={newGameButton}> New Game Button</button>) :
       next ? (<button onClick = {nextButton} > Next </button>):
      (<button onClick={onSubmit}> Submit </button>)}
    
    </div>
  )
};

export default GuessInput;