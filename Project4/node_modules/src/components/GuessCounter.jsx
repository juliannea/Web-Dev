import React, { useContext } from 'react';
import '../styles/GuessCounter.css'
import { useState, createContext } from 'react';
import { AppContext } from '../App';

const GuessCounter = () => {
  // Hint* Apply the grayscale class to denote a used up/failed guess. Example below on first Pokéball
  const {firstBall} = useContext(AppContext);
  const {setFirstBall} = useContext(AppContext);
  const {secBall} = useContext(AppContext);
  const {setSecBall} = useContext(AppContext);
  const {thirdBall} = useContext(AppContext);
  const {setThirdBall} = useContext(AppContext);
  const {resetGame} = useContext(AppContext);


  return (
    <div id='guess-counter'>
      {/*if state for ball is set to false greyed out. If reset game set to true then all red*/}
      <img
        className={`pokeball-counter ${(!firstBall )? 'grayscale' : ''}`}
        alt=""
        src='/assets/pokeball.png'
      />
      <img
        className={`pokeball-counter ${(!secBall) ? 'grayscale' : ''}`}
        alt=""
        src='/assets/pokeball.png'
      />
      <img
        className={`pokeball-counter ${(!thirdBall) ? 'grayscale' : ''}`}
        alt=""
        src='/assets/pokeball.png'
      />
    </div>
  )
};

export default GuessCounter;