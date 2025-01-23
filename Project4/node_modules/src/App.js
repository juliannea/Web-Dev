import React from 'react';
import './styles/App.css';
import PokemonDisplay from './components/PokemonDisplay';
import GuessInput from './components/GuessInput';
import GuessCounter from './components/GuessCounter';
import { useState, createContext } from 'react';

//----Creating global context to hold all info want to pass fown---//
export const AppContext = createContext();

function App() {
  // Hint* Create a game state here and pass it along to the components as needed.
  //       Think about how you want to model your data to represent the game state.
  
  //current pokemon to guess state 
  const [currentPokemon, setCurrentPokemon] = useState("Pikachu"); //first guess state
  const [pokeID, setPokeID] = useState(1); //start with 1 for Pikachu
  const [guess, setGuess] = useState("");
  const [afterImg, setAfterImg] = useState(false);
  const [oldPoke, setOldPoke] = useState("");
  const [oldID, setOldID] = useState("");
  //has "Pokemon" in list to account for fact that list starts at 0
  const [pokeList, setPokeList] = useState(["Pokemon", "Pikachu", "Onix", "Clefairy", "Bulbasaur", "Charmander", "Squirtle", "Gengar", "Ditto", "Eevee", "Snorlax"]);
  
  //states for guess balls
  const [firstBall, setFirstBall] = useState(true);
  const [secBall, setSecBall] = useState(true);
  const [thirdBall, setThirdBall] = useState(true);
  const [resetGame, setResetGame] = useState(false);
  const [newGame, setNewGame] = useState(false);
  const [next, setNext] = useState(false);

  

  return (
    <div className="App">
    <AppContext.Provider value={{
      firstBall, 
      setFirstBall, 
      secBall, 
      setSecBall,
      thirdBall, 
      setThirdBall,
      guess,
      setGuess,
      pokeList,
      pokeID,
      setPokeID,
      resetGame,
      setResetGame,
      newGame,
      setNewGame,
      next,
      setNext,
      afterImg,
      setAfterImg,
      currentPokemon,
      setCurrentPokemon,
      oldPoke,
      setOldPoke,
      oldID,
      setOldID
      }}>
      <PokemonDisplay/>
      <GuessCounter/>
      <GuessInput/>

    </AppContext.Provider>
     
    </div>
  );
}

export default App;
