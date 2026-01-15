import React, { useEffect, useState } from "react";
import { pokeApi, type Pokemon } from "./api/pokeapi";
import { SearchBar } from "./component/Searchbar";
import PokemonCard from "./component/PokemonCard";
import PokemonList from "./component/PokemonList";
import axios from "axios";
import Pagination from "./component/Pagination";

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [currentPageUrl, setCurrentPageUrl] = useState<string>(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [prevPageUrl, setPrevPageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [fitToPage, setFitToPage] = useState<boolean>(true);

  const loadPokemons = async (url: string) => {
    const res = await axios(url);
    const data = await res.data;

    const detailed = await Promise.all(
      data.results.map(async (p: { name: string; url: string }) => {
        const pokeRes = await axios(p.url);
        return pokeRes.data;
      })
    );

    setPokemons(detailed);
    setNextPageUrl(data.next);
    setPrevPageUrl(data.previous);
  };

  useEffect(() => {
    setLoading(true);
    loadPokemons(currentPageUrl).then(() => setLoading(false));
  }, [currentPageUrl]);

  const gotoNextPage = () => {
    if (nextPageUrl) setCurrentPageUrl(nextPageUrl);
  };

  const gotoPrevPage = () => {
    if (prevPageUrl) setCurrentPageUrl(prevPageUrl);
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600"></div>
        </div>
        <p className="mt-4 text-purple-600 font-semibold">
          Loading Pokémons...
        </p>
      </div>
    );

  const searchForPokemon = async (pokemonName: string) => {
    try {
      const response = await pokeApi.getPokemon(pokemonName);
      setPokemon(response.data);
    } catch {
      setPokemon(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Fit to Page Toggle */}
      <div className="flex justify-evenly mb-4 no-print">
        <img src="pokemon-23.svg" alt="logo" className="h-10 w-auto pr-5" />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={fitToPage}
            onChange={() => setFitToPage(!fitToPage)}
          />
          Fit to Page
        </label>
        <div>
          <SearchBar onSearch={searchForPokemon} />
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* LEFT PANEL */}
        <div className="flex flex-col gap-4">
          <PokemonList
            pokemons={pokemons}
            pokemon={pokemon}
            setPokemon={setPokemon}
          />
          <Pagination
            gotoNextPage={nextPageUrl ? gotoNextPage : null}
            gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
          />
        </div>

        {/* RIGHT PANEL */}

        <PokemonCard pokemon={pokemon} fitToPage={fitToPage} />
      </div>
    </div>
  );
};

export default App;
