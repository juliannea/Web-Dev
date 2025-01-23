import React, { useContext } from 'react';
import App, { AppContext } from '../App';
import { useState, useEffect } from 'react';

const PokemonDisplay = () => {
  const {currentPokemon} = useContext(AppContext);
  const {pokeID} = useContext(AppContext);
  const {setAfterImg} = useContext(AppContext);
  const {afterImg} = useContext(AppContext);

  return (
    <div>
       <img alt="" src={afterImg ? `/assets/${pokeID}_after.png` : `/assets/${pokeID}_before.png`} />
    </div>
  )
};

export default PokemonDisplay;