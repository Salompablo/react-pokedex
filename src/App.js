import Navbar from './components/Navbar/Navbar';
import PokedexList from './components/PokedexList/PokedexList';
import SearchBar from './components/SearchBar/SearchBar';
import './styles/_mainstyles.scss';
import React, {useEffect, useState} from 'react';
import {getPokemonData, getPokemons} from "./Services/Services"
import { FavoriteProvider } from './contexts/favoriteContext';

function App() {
  
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const fetchPokemons = async () =>{
    try{
      const data = await getPokemons(12, 12 * page);
      const promises = data.results.map(async (pokemon) =>{
        return await getPokemonData(pokemon.url)
      })
      const results = await Promise.all(promises)
      setPokemons(results)
      setLoading(false);
      setTotal(Math.ceil(data.count / 12))
    } catch (err){

    }
  }

  useEffect(() => {
    fetchPokemons();
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
  }

  return (
    <FavoriteProvider value={{
      favoritePokemons: favorites,
      updateFavoritePokemons: updateFavoritePokemons
      }}
      >
    <Navbar />
    <div className="App">
      <div className="TitleSection">
        <SearchBar />
        <PokedexList 
        loading={loading}
        pokemons={pokemons}
        page={page}
        setPage={setPage}
        total={total}  
        />
      </div>
    </div>
    </FavoriteProvider>
  )
}

export default App;