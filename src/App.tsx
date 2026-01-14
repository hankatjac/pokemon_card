import React, { useEffect, useState } from "react";
import { pokeApi, type Pokemon } from "./api/pokeapi";
import { SearchBar } from "./component/Searchbar";
import PokemonCard from "./component/PokemonCard";
import PokemonList from "./component/PokemonList";
import axios from "axios";
import Pagination from "./component/Pagination";

// type PokemonItem = {
//   name: string;
//   image: string;
// };

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [prevPageUrl, setPrevPageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   //As of 2026, axios.CancelToken is deprecated in favor of the native AbortController. For production apps in 2026, consider using TanStack Query or SWR
  //   const controller = new AbortController();
  //   setLoading(true);

  //   axios
  //     .get(currentPageUrl, { signal: controller.signal })
  //     .then((res) => {
  //       setLoading(false);
  //       setNextPageUrl(res.data.next);
  //       setPrevPageUrl(res.data.previous);
  //       setPokemons(res.data.results.map((p: { name: any }) => p.name));
  //     })
  //     .catch((err) => {
  //       if (axios.isCancel(err)) return; // Ignore error if it was a manual cancel
  //       console.error(err);
  //     });

  //   return () => controller.abort();
  // }, [currentPageUrl]);

  const loadPokemons = async (url: string) => {
    const res = await axios(url);
    const data = await res.data;

    const detailed = await Promise.all(
      data.results.map(async (p: { name: string; url: string }) => {
        const pokeRes = await axios(p.url);
        const pokeData = await pokeRes.data;

        return pokeData;
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
    setCurrentPageUrl(nextPageUrl ?? "");
  };

  const gotoPrevPage = () => {
    setCurrentPageUrl(prevPageUrl ?? "");
  };

  if (loading) return "Loading...";

  const searchForPokemon = async (pokemonName: string) => {
    try {
      const response = await pokeApi.getPokemon(pokemonName);
      const pokemonData = response.data;
      setPokemon(pokemonData);
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
        <div className="flex flex-col gap-4">
          <SearchBar onSearch={searchForPokemon} />
          <PokemonCard pokemon={pokemon} />
        </div>
      </div>
    </div>
  );
};

export default App;
