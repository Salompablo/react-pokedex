import React from 'react'
import Pokemon from '../Pokemon/Pokemon';

export default function PokedexList(props) {

const {pokemons} = props;

    return (
    <div>
        <div className='header'>
            <h1>Pokedex</h1>
            <div>
            Pagination    
            </div>
            <div className='pokedex-grid'>
                {pokemons.map((pokemon, id) => {
                    return (
                        <Pokemon pokemon={pokemon} key={pokemon.name/>
                    )
                })}
            </div>
        </div>
    </div>
)
}
