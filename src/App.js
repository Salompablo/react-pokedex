import Navbar from './components/Navbar/Navbar';
import PokedexList from './components/PokedexList/PokedexList';
import SearchBar from './components/SearchBar/SearchBar';
import './styles/_mainstyles.scss';
import React, {useEffect, useState} from 'react';
import {getPokemonData, getPokemons, searchPokemon} from "./Services/Services"
import { FavoriteProvider } from './contexts/favoriteContext';
import Footer from './components/Footer/Footer';

function App() {
  
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [searching, setSearching] = useState(false);

  const localStorageKey = "favorite_pokemon";

  const fetchPokemons = async () =>{
    try{
      const data = await getPokemons(24, 24 * page);
      const promises = data.results.map(async (pokemon) =>{
        return await getPokemonData(pokemon.url)
      })
      const results = await Promise.all(promises)
      setPokemons(results)
      setLoading(false);
      setTotal(Math.ceil(data.count / 24))
      setNotFound(false);
    } catch (err){

    }
  }

  const loadFavoritePokemons = () =>{
    const pokemons = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
  setFavorites(pokemons); 
  }

  useEffect(() => {
    loadFavoritePokemons();
  }, [])

  useEffect(() => {
    if(!searching) {
      fetchPokemons();
    }
  }, [page]);
  
  const updateFavoritePokemons = (name) => {
    const updated = [...favorites];
    const isFavorite = updated.indexOf(name);
    if (isFavorite >= 0) {
      updated.splice(isFavorite, 1);
    } else {
      updated.push(name);
    }
    setFavorites(updated);
    window.localStorage.setItem(localStorageKey, JSON.stringify(updated));
  }

  const onSearch = async (pokemon) => {
    if(!pokemon) {
      return fetchPokemons();
    }
    setLoading(true);
    setNotFound(false);
    setSearching(true);
    const result = await searchPokemon(pokemon);
    if(!result) {
      setNotFound(true);
      setLoading(false);
      return;
    } else {
      setPokemons([result]);
      setPage(0);
      setTotal(1);
    }
    setLoading(false);
    setSearching(false);
  }

  return (
    <FavoriteProvider value={{
      favoritePokemons: favorites,
      updateFavoritePokemons: updateFavoritePokemons
      }}
      >
      <div>
        <Navbar />
        <div className="App">
        <SearchBar onSearch={onSearch} />
        {notFound ? (
        <div className='not-found-text'>No se encontró el Pokemon que buscabas
        </div>
        )
        : ( 
        <PokedexList 
        loading={loading}
        pokemons={pokemons}
        page={page}
        setPage={setPage}
        total={total}  
        />
        )}
        </div>
      <Footer />
      </div>
    </FavoriteProvider>
  );
}

export default App;