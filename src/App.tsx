import React, { useEffect, useState } from "react";
import { pokeApi, type Pokemon } from "./api/pokeapi";
import { SearchBar } from "./component/Searchbar";
import { SearchResult } from "./component/SearchResult";
import PokemonList from "./component/PokemonList";
import axios from "axios";
import Pagination from "./component/Pagination";

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<string[]>([]);
  const [pokemon, setPokemon] = useState<Pokemon | undefined | null>(undefined);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [prevPageUrl, setPrevPageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    //As of 2026, axios.CancelToken is deprecated in favor of the native AbortController. For production apps in 2026, consider using TanStack Query or SWR
    const controller = new AbortController();
    setLoading(true);

    axios
      .get(currentPageUrl, { signal: controller.signal })
      .then((res) => {
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        setPokemons(res.data.results.map((p: { name: any }) => p.name));
      })
      .catch((err) => {
        if (axios.isCancel(err)) return; // Ignore error if it was a manual cancel
        console.error(err);
      });

    return () => controller.abort();
  }, [currentPageUrl]);

  const gotoNextPage = () => {
    setCurrentPageUrl(nextPageUrl ?? "");
  };

  const gotoPrevPage = () => {
    setCurrentPageUrl(prevPageUrl ?? "");
  };

  if (loading) return "Loading...";

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
      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* LEFT PANEL */}
        <div className="flex flex-col gap-4">
          <PokemonList pokemons={pokemons} />
          <Pagination
            gotoNextPage={nextPageUrl ? gotoNextPage : null}
            gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
          />
        </div>

        {/* RIGHT PANEL */}
        <div className="flex flex-col gap-4">
          <SearchBar onSearch={searchForPokemon} />
          <SearchResult pokemon={pokemon} />
        </div>
      </div>
    </div>
  );
};

export default App;
