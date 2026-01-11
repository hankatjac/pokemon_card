import React, { useState } from "react";
import { pokeApi, type Pokemon } from "./api/pokeapi";
import { SearchBar } from "./component/Searchbar";
import { SearchResult } from "./component/SearchResult";

const App: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon | undefined | null>(undefined);

  const searchForPokemon = async (pokemonName: string) => {
    try {
      const response = await pokeApi.getPokemon(pokemonName);
      setPokemon(response.data);
    } catch {
      setPokemon(null);
    }
  };

  return (
    <div>
      <SearchBar onSearch={searchForPokemon} />

      <SearchResult pokemon={pokemon} />
    </div>
  );
};

export default App;
