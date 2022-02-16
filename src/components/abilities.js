import React from "react";
import { capitalizeFirstLetter } from "../App";

export default function Abilities(props) {
    const { pokemonData } = props;
    const abilities = pokemonData[0].abilities;
    return (
        <div className="abilities-div">
            <p>Abilities</p>
            <div id="abilities-list">
                {
                    abilities.map(ability => 
                        <div className="ability-item" id={ability.ability.name}>{capitalizeFirstLetter(ability.ability.name)}</div>
                        )
                }
            </div>
        </div>
    )
}