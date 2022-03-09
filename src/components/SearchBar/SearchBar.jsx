import React, { useState } from 'react';
import './_searchbar.scss';
import Image from "./PokeImg.png";
import axios from 'axios';

export default function SearchBar() {
const [expandedSearch, setExpandedSearch] = useState(false);
const [pokemonName, setPokemonName] = useState(""); //Buscador 
const [pokemon, setPokemon] = useState({
    name: "",
    number: "",
    species: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    type: "",
});
const [pokemonChosen, setPokemonChosen] = useState(false);

const searchPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
    (res) => {
        setPokemon({
        name: pokemonName,
        number: res.data.id,
        image: res.data.sprites.front_default,
        hp: res.data.stats[0].base_stat,
        attack: res.data.stats[1].base_stat,
        defense: res.data.stats[2].base_stat,
        speed: res.data.stats[5].base_stat,
					type: res.data.types[0].type.name,
        weight: res.data.weight,
        abilities: res.data.abilities
        });
        setPokemonChosen(true);
    }
    );
};

return (
    <div>
    {expandedSearch && (
    <>
        <div className='searchbar-container'>
            <div className='searchbar'>
                <input type="text" onChange={(event) => {
                    setPokemonName(event.target.value);
                }} value={pokemonName.toLowerCase()}
                />
            </div>
            <div className='searchbar-button'>
            <button onClick={searchPokemon}>Search Pokémon</button> 
            {/* Poner buscador por id */}
            </div>
        </div>
        <div className="DisplaySection">
        {!pokemonChosen ? (
        <h1> Please choose a Pokémon </h1>
        ) : (
        <div className='poke-card'>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.image} alt={pokemon.name} />
            <h3>Number: #{pokemon.number}</h3>
            <h3>Type: {pokemon.type}</h3>
            <h4>Hp: {pokemon.hp}</h4>
            <h4>Attack: {pokemon.attack}</h4>
            <h4>Defense: {pokemon.defense}</h4>
            <h4>Speed: {pokemon.speed}</h4>
        </div>
        )}
    </div>
        </>
    )}
    <div className='iconContainer' onClick={() => {
    setExpandedSearch(true);
    }}>
    <img src={Image} alt='pokédex' className='pokédex' in="{expandedSearch}" />
    </div>
    </div>
)
}