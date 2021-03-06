import React, {useState} from 'react';
import axios from 'axios';
import Abilities from './components/abilities';
import Moves from './components/moves';
import './App.css';

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const App = () => {
  const [pokemon, setPokemon] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");
  const [isToggled, setIsToggled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

 

  const getPokemon = async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      toArray.push(res.data);
      setPokemonType(res.data.types[0].type.name);
      setPokemonData(toArray)
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

  const togglePopup = () => {
    setIsToggled(!isToggled);
  }

  const openPopup = () => {
    setIsOpen(!isOpen);
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
              <img src={data.sprites["front_default"]} alt={pokemon}/>
              <div className='table'>
                <div className='row'>
                  <div className='header-cell cell'>TYPE</div>
                  <div className='cell'>{capitalizeFirstLetter(pokemonType)}</div>
                </div>
                <div className='row'>
                  <div className='header-cell cell'>HEIGHT</div>
                  <div className='cell'>{Math.round(data.height * 3.9)}"</div>
                </div>
                <div className='row'>
                  <div className='header-cell cell'>WEIGHT</div>
                  <div className='cell'>{Math.round(data.weight / 4.3)} lbs</div>
                </div>
                <div className='row'>
                  <div className='header-cell cell'>ABILITIES</div>
                  <div className='cell list-cell'>{data.abilities.length}
                    <input 
                      id="abilities-btn" 
                      className="list-btn"
                      type="button"
                      value="List"
                      onClick={togglePopup}/>
                  </div>
                </div>
                <div className='row'>
                  <div className='header-cell cell'>MOVES</div>
                  <div className='cell list-cell'>{data.moves.length}
                  <input 
                      id="moves-btn" 
                      className="list-btn"
                      type="button"
                      value="List"
                      onClick={openPopup}/>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {isToggled && <Abilities 
        content={
          <>
            <b>Abilities List</b>
            <div id="abilities-list">
                  {
                      pokemonData[0].abilities.map(ability => 
                          <div className="ability-item" id={ability.ability.name}>{capitalizeFirstLetter(ability.ability.name)}</div>
                      )
                  }
            </div>
          </>
        }
        handleClose={togglePopup}
      />}
      {isOpen && <Moves 
        content={
          <>
            <b>Moves List</b>
            <div id="moves-list">
              {
                pokemonData[0].moves.map(move =>
                    <div className='move-itme' id={move.move.name}>{capitalizeFirstLetter(move.move.name)}</div>
                  )
              }
            </div>
          </>
        } 
        handleClose={openPopup}
      />}
    </div>
  );
}

export default App;
