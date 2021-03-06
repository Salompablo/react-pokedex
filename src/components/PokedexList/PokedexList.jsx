import React from 'react'
import Pagination from '../Pagination/Pagination';
import Pokemon from '../Pokemon/Pokemon';
import './_pokedexlist.scss'

export default function PokedexList(props) {

const {pokemons, page, setPage, total, loading } = props;


const lastPage = () => {
    const nextPage = Math.max(page - 1, 0);
    setPage(nextPage)
}

const nextPage = () => {
    const nextPage = Math.min(page + 1, total);
    setPage(nextPage)
}

    return (
    <div>
        <div className='header'>
            <h1>Pokedex</h1>
            <Pagination
                page={page + 1}
                totalPages={total}
                onLeftClick={lastPage}
                onRightClick={nextPage}

            />
            </div>
            {loading ? 
            <div>Cargando pokemons...</div> 
            :
            <div className='pokedex-grid'>
                {pokemons.map((pokemon, id) => {
                    return (
                        <Pokemon pokemon={pokemon} key={pokemon.name}/>
                    )
                })}
            </div>
            } 
        </div>
)
}
