import React, { useState } from 'react';
import './_searchbar.scss';
import { searchPokemon } from '../../Services/Services';


export default function SearchBar() { //Buscador 
const [search, setSearch] = useState('');
const [pokemon, setPokemon] = useState('');

const onChange = (e) => {
    setSearch(e.target.value);
}

const onClick = async (e) => {
    const data = await searchPokemon(search);
    setPokemon(data);
}


return (
    <>
        <div className="searchbar-container">
    <div className="searchbar">
        <input placeholder="Buscar pokemon..." onChange={onChange} />
    </div>
    <div className="searchbar-button">
        <button onClick={onClick}>Buscar</button>
    </div>
    </div>
    </>
);
}