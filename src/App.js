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
              <div className='card-header'>
                <h4>{capitalizeFirstLetter(data.name)}</h4>
                <h4>#{data.id}</h4>
              </div>
              <img src={data.sprites["front_default"]}/>
              <table className='divTable'>
                <div classeName='divTableBody'>
                  <tr classeName='divTableRow'>
                    <th classeName='table-category'>Type</th>
                    <td classeName='divTableCell'>{capitalizeFirstLetter(pokemonType)}</td>
                  </tr> 
                  <tr classeName='divTableRow'>
                    <th classeName='table-category'>Height</th>
                    <td classeName='divTableCell'>{data.height}</td>
                  </tr>
                  <tr classeName='divTableRow'>
                    <th classeName='table-category'>Weight</th>
                    <td classeName='divTableCell'>{data.weight}</td>
                  </tr>
                  <tr classeName='divTableRow'>
                    <th classeName='table-category'>Abilities</th>
                    <td classeName='divTableCell'>{data.abilities.length}</td>
                  </tr>
                  <tr classeName='divTableRow'>
                    <th classeName='table-category'>Moves</th>
                    <td classeName='divTableCell'>{data.moves.length}</td>
                  </tr>
                </div>
              </table>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
