import express from 'express';
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: 'json' };

const app = express();
// This allows us to parse JSON data from the request body (if any).
app.use(express.json())

// Swagger config
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 3000;

// *Hint: use this array to store a list of objects of each of the caught Pokémon.
const CAUGHT_POKEMON = [];

// *Hint: use uuidv4 to generate a random ID
let uniqueID = uuidv4();

// Root route to get your started + check for PokeAPI connectivity.
app.get('/', async (req, res) => {
  await fetch('https://pokeapi.co/api/v2/')
    .then(() => {
      res.send(`
        <html lang="en-US">
           <h1>PokeAPI Online!</h1>
           <h3>Head on over to <a href="http://localhost:3000/api-docs">/api-docs</a> to get started!</h3>
        </html>
      `);
    })
    .catch((e) => {
      res.send(`
        <html lang="en-US">
           <h1>PokeAPI is down.</h1>
           <h3>Check <a href="https://pokeapi.statuspage.io/">https://pokeapi.statuspage.io/</a> for status updates</h3>
           <div>Error: ${e}</div>
        </html>
      `);
    })
})

/*
* Start implementing the endpoints below!
* */
//---------------------getid ----------------------------
app.get('/pokemon/:id', (req, res) => {
  const { id } = req.params; 
  console.log('id recieved', req.params);

  // extrac data 
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => {
      //error handling 
      if (!response.ok) { 
        throw new Error('Invalid ID or Name given'); 
      }
      return response.json(); 
    })
    .then(data => {
      const pokemon = {
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        stats: {
          hp: data.stats.find(stat => stat.stat.name === 'hp')?.base_stat,
          attack: data.stats.find(stat => stat.stat.name === 'attack')?.base_stat,
          defense: data.stats.find(stat => stat.stat.name === 'defense')?.base_stat,
          specialAttack: data.stats.find(stat => stat.stat.name === 'special-attack')?.base_stat,
          specialDefense: data.stats.find(stat => stat.stat.name === 'special-defense')?.base_stat,
          speed: data.stats.find(stat => stat.stat.name === 'speed')?.base_stat
        }
      };
      //return data in format
      res.json(pokemon);
    })
    .catch(error => {
      console.error('Invalid ID or Name given', error.message);
      // Send a 400 response if an invalid Pokémon ID or name is provided
      res.status(400).json({ error: error.message });
    });
});

//---------------------Catch Pokemon--------------------------------------

app.post('/pokemon/catch', async (req, res) => {
  console.log("------catching pokemon------")
  // get pokemon id and list names 
  const catchPokemon = req.body; 
    //iterate through list if valid add if not ignore dont add 
    await Promise.all(
      catchPokemon.map(async (id) => {
        //extract the data 
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok){
          
          console.log(id,"invalid name or id skipping")
          return;
        }
        const data = await response.json();
        const caughtPokemon = {
          id: data.id,
          caughtPokemonId: uuidv4(),
          name: data.name,
          moves: [],
          height: data.height,
          weight: data.weight,
          stats: {
            hp: data.stats.find(stat => stat.stat.name === 'hp')?.base_stat,
            attack: data.stats.find(stat => stat.stat.name === 'attack')?.base_stat,
            defense: data.stats.find(stat => stat.stat.name === 'defense')?.base_stat,
            specialAttack: data.stats.find(stat => stat.stat.name === 'special-attack')?.base_stat,
            specialDefense: data.stats.find(stat => stat.stat.name === 'special-defense')?.base_stat,
            speed: data.stats.find(stat => stat.stat.name === 'speed')?.base_stat,
          },
        };
        CAUGHT_POKEMON.push(caughtPokemon);
      })
    );

    //return list of pokemons
    res.status(200).json(CAUGHT_POKEMON);
    //in case an error occurs 
  
});

//-------------------get cauught pokemon with id------------------------------------------
app.get('/pokemon/caught/:caughtPokemonId?', (req, res) => {
  console.log("-----getting caught pokemons-----")
  //debugging attemot 
  console.log("Request URL: ", req.originalUrl);
  console.log("req.params: ", req.params);
  const {caughtPokemonId} = req.params; 
  console.log("Input: ", caughtPokemonId)

  if(caughtPokemonId == '{caughtPokemonId}' || !caughtPokemonId){ //b/c for some reason no input returns 'caughtPokemonID' rather than undefined 
    console.log("no input")
    res.json(CAUGHT_POKEMON)
  }
  else if (caughtPokemonId) {
    console.log("ID given")
    // find pokemon in the array 
    const pokemon = CAUGHT_POKEMON.find(p => p.caughtPokemonId === caughtPokemonId);
    if(pokemon){
      console.log("valid id");
      res.json(pokemon);
    }
    else{
      console.log("invalid id");
      res.json({}); //return an empty object if invalid 
    }
  } 
  
});

//----Delete from caught list--------
app.delete('/pokemon/caught/:caughtPokemonId', (req, res) => {
  console.log("-----deleting caught pokemon----")
  const { caughtPokemonId } = req.params;
  //check if index given is in list 
  const index = CAUGHT_POKEMON.findIndex(pokemon => pokemon.caughtPokemonId === caughtPokemonId);

  if (index !== -1) {
    const [deletedPokemon] = CAUGHT_POKEMON.splice(index, 1);
    res.status(200).json(
       `Successfully deleted Pokémon: ${deletedPokemon.caughtPokemonId}`
    );
  } 
  else {
    //error response
    res.status(400).json('Error caughtPokemonID given, meaning no Pokémon with the caughtPokemonId found to delete/release.'
    );
  }
});

//---teach pokemon-------
app.post('/pokemon/teach/:caughtPokemonId', async (req, res) => {
  console.log("-----teaching caught pokemon----")
  const { caughtPokemonId } = req.params; 
  const movesData = req.body; //aray of moves 
  const pokemon = CAUGHT_POKEMON.find(p => p.caughtPokemonId === caughtPokemonId); //finding pokemon in the array 
  //if not in list 
  if (!pokemon) {
    return res.status(400).json(`Error caughtPokemonID given (meaning no caught Pokémon with that ID exists). Or you are unable to teach the move to the Pokémon.`
  );
  }

  // initalize and array of moves 
  if (!pokemon.moves) {
    pokemon.moves = [];
  }
  movesData.forEach((move, index) => {
    //even index will have the move id 
    if (index % 2 === 0) {
      const moveId = move;
      const moveName = movesData[index + 1]; //for the name

      
      const existingMove = pokemon.moves.find(m => m.id === moveId);
      //if move doesnt already exist adds the move to the array of moves if the move is full removes the first move on the array 
      if(!existingMove){
        if(pokemon.moves.length >=4){
          //remove first move 
          pokemon.moves.shift()
        }
        //add new move
        pokemon.moves.push({ id: moveId, name: moveName });
      }
      
    }
  });

  // return the data with the new moves
  return res.status(200).json(pokemon);
});
//----------------Evolution----------------------------------
// fetch species datay to get the evolution chain url of that pokemon 
async function fetchSpeciesData(pokemonName) {
  try {
    const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
    
    if (!speciesResponse.ok) {
      throw new Error(`Failed to fetch species data for ${pokemonName}`);
    }
    
    const speciesData = await speciesResponse.json();
    return speciesData.evolution_chain.url; 
  } catch (error) {
    console.error(error.message);
    throw error; 
  }
}

// fecth evolution chain data with the id in the url 
async function fetchEvolutionChain(chainUrl) {
  try {
    const evolutionChainResponse = await fetch(chainUrl);
    
    if (!evolutionChainResponse.ok) {
      throw new Error(`Failed to fetch evolution chain data from ${chainUrl}`);
    }

    const evolutionChainData = await evolutionChainResponse.json();
    return evolutionChainData.chain; 
  } catch (error) {
    console.error(error.message);
    throw error; 
  }
}

//gets the next evolution of pokemon 
function getNextEvolution(chain) {
  if (chain.evolves_to && chain.evolves_to.length > 0) {
    //returns the first next one on the chain 
    return chain.evolves_to[0]; 
  }
  //if can't evolve anymore returns a null value 
  return null; 
}

//change to evolve 
app.put('/pokemon/evolve/:caughtPokemonId', async (req, res) => {
  console.log("-----evolving pokemon-----")
  const { caughtPokemonId } = req.params; 

  // check in caught list 
  const pokemon = CAUGHT_POKEMON.find(p => p.caughtPokemonId === caughtPokemonId);
  //case not in list 
  if (!pokemon) {
    console.log("not in caught list")
    return res.status(400).json(`Error caughtPokemonId given (meaning no caught Pokémon with that ID exists). Or you are unable to evolve Pokémon.`);
  }

  try {
    //get evolution chain url based on the pokemon 
    const evolutionChainUrl = await fetchSpeciesData(pokemon.name); 
    //get the evolution chain data 
    const evolutionChain = await fetchEvolutionChain(evolutionChainUrl); 

    //get the first next evolution in the chain 
    const nextEvolution = getNextEvolution(evolutionChain); 
    
    if (!nextEvolution) {
      return res.status(400).json(`Pokémon ${pokemon.name} cannot evolve or is already in its final form.`);
    }

    // update name and id in data 
    pokemon.name = nextEvolution.species.name;
    const id = pokemon.name;
    //find the id of the pokemon given the name since getNextEvolution only has the name not id
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) throw new Error(`Invalid Pokémon: ${id}`);
    const data = await response.json();
  
    pokemon.id = data.id;

    res.status(200).json(pokemon);
  } catch (error) {
    return res.status(400).json('Error fetching evolution data.');
  }
});


//-------can breed----------------------

//helper to check for valid id 
async function validID(id){
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) {
      console.log("Invalid ID in list");
      return false;
    }
    console.log(`${id} is valid`);
    return true;
  } catch (error) {
    console.error(`Error fetching Pokémon data for ${id}:`, error.message);
    return false;
  }
};

app.post('/pokemon/breed-check', async (req, res) => {
  console.log("---can breed----")
    const pokemonIds = req.body; // Expecting an array of 2 Pokémon IDs/names

    // edge case check two pokemons in list 
    if (!pokemonIds || pokemonIds.length !== 2) {
      return res.status(400).json('Please provide exactly two Pokémon IDs/names.');
    }
  
    // check if valid Pokémon IDs in the list
    const firstValid = await validID(pokemonIds[0]);
    const secondValid = await validID(pokemonIds[1])

    if (!firstValid || !secondValid) {
      return res.status(400).json("Error Pokémon ID or name given in the request payload.");
    }
    
    
    // get the egg group for the given pokemon
    const getEggGroup = async (pokemon) => {
      const url = `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`;
      const response = await fetch(url);
      const data = await response.json();
      return data.egg_groups; 
    };
  
      //find the egg groups 
    const [firstEggGroup, secondEggGroup] = await Promise.all([
      getEggGroup(pokemonIds[0]),
      getEggGroup(pokemonIds[1]),
    ]);
  
      // check if common egg
    const canBreed = firstEggGroup.some(group1 =>
      secondEggGroup.some(group2 => group1.name === group2.name)
    );
  
    //return true if can breed else false 
    return res.json(canBreed);

});

//-----------add to bag-----------

//initialize arry 
let bag = [];
app.get('/item/buy/:id', (req, res) => {
  console.log("----add to bag-----")
  const { id } = req.params; 

  // check bag full limit 10 
  if (bag.length >= 10) {
    console.log("full bag");
    return res.status(500).json("Bag is full, unable to store any more items. Limit of 10 items reached." );
  }

  fetch(`https://pokeapi.co/api/v2/item/${id}`)
    .then(response => {
      //case invalid item 
      if (!response.ok) {
        throw new Error('Invalid ID or name');
      }
      return response.json();
      
    })
    //data extrraction and set up 
    .then(data => {
      const item = {
        id: data.id,
        name: data.name,
        cost: data.cost || 0
      };

      bag.push(item);

      res.json(bag);
    })
    .catch(error => {
      console.error('Error fetching item', error.message);
      res.status(400).json({ error: error.message });
    });
});

//-----return list of bag items-----
app.get('/bag', (req, res) => {
  console.log("----get items in bag ----")
  //case bag is empty 
  if (bag.length === 0) {
    return res.json([]);
  }
    res.json(bag);
});
 //----delete bag----
app.delete('/bag', (req, res) => {
  console.log("----emptying bag----")
  bag = [];
  res.json("Bag emptied!" );
});




app.listen(PORT, () => {
  console.log(`ExpressJS server listening on port ${PORT}`);
})