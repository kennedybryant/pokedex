import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const App = () => {
  const [pokemon, setPokemon] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");

  const getPokemon = async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      toArray.push(res.data);
      setPokemonType(res.data.types[0].type.name);
      setPokemonData(toArray)
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase())
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  }

  return (
    <div className="App">
      <div className='header-section'>
        <p id="poke-title">PokeDex</p>
        <form onSubmit={handleSubmit}>
          <label>
            <input 
            type="text" 
            onChange={handleChange} 
            placeholder="Enter Pokemon Name"
            />
          </label>
        </form>
      </div>
      <div className='body-section'>
        {pokemonData.map((data) => {
          return (
            <div className='poke-card'>
              <h4>{capitalizeFirstLetter(data.name)}</h4>
              <img src={data.sprites["front_default"]}/>
              <div className='divTable'>
                <div classeName='divTableBody'>
                  <div classeName='divTableRow'>
                    <div classeName='divTableCell'>Type</div>
                    <div classeName='divTableCell'>{pokemonType}</div>
                  </div> 
                  <div classeName='divTableRow'>
                    <div classeName='divTableCell'>Height</div>
                    <div classeName='divTableCell'>{data.height}</div>
                  </div>
                  <div classeName='divTableRow'>
                    <div classeName='divTableCell'>Weight</div>
                    <div classeName='divTableCell'>{data.weight}</div>
                  </div>
                  <div classeName='divTableRow'>
                    <div classeName='divTableCell'>Number of Appearances</div>
                    <div classeName='divTableCell'>{data.game_indices.length}</div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
