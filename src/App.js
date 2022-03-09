import Navbar from './components/Navbar/Navbar';
import PokedexList from './components/PokedexList/PokedexList';
import SearchBar from './components/SearchBar/SearchBar';
import './styles/_mainstyles.scss';
import React, {useEffect, useState} from 'react';
import {getPokemons} from "./Services/Services"

function App() {
  
  const [pokemons, setPokemons] = useState([]);

  const fetchPokemons = async () =>{
    try{
      const data = await getPokemons();
      setPokemons(data.results);
    } catch (err){

    }
  }

  useEffect(() => {
    fetchPokemons();
  }, [])
  
  
  
  
  return (
    <>
    <Navbar />
    <div className="App">
      <div className="TitleSection">
        <SearchBar />
        <PokedexList pokemons={pokemons} />
      </div>
    </div>
    </>
  )
}

export default App;