import React, { useEffect, useState } from "react";
import { pokeApi, type Pokemon } from "./api/pokeapi";
import { SearchBar } from "./component/Searchbar";
import PokemonCard from "./component/PokemonCard";
import PokemonList from "./component/PokemonList";
import axios from "axios";
import Pagination from "./component/Pagination";

const App: React.FC = () => {
  const initialPokemon = {
    abilities: [
      {
        ability: {
          name: "static",
          url: "https://pokeapi.co/api/v2/ability/9/",
        },
        is_hidden: false,
        slot: 1,
      },
      {
        ability: {
          name: "lightning-rod",
          url: "https://pokeapi.co/api/v2/ability/31/",
        },
        is_hidden: true,
        slot: 3,
      },
    ],
    base_experience: 112,
    forms: [
      { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon-form/25/" },
    ],
    game_indices: [],
    height: 4,
    held_items: [],
    id: 25,
    is_default: true,
    location_area_encounters: "https://pokeapi.co/api/v2/pokemon/25/encounters",
    moves: [],
    name: "pikachu",
    order: 35,
    species: {
      name: "pikachu",
      url: "https://pokeapi.co/api/v2/pokemon-species/25/",
    },
    sprites: {
      other: {
        "official-artwork": {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
          front_shiny:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/25.png",
        },
      },
      back_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png",
      back_female: null,
      back_shiny:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/25.png",
      back_shiny_female: null,
      front_default:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
      front_female: null,
      front_shiny:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png",
      front_shiny_female: null,
    },

    stats: [
      {
        base_stat: 35,
        effort: 0,
        stat: { name: "hp", url: "https://pokeapi.co/api/v2/stat/1/" },
      },
      {
        base_stat: 55,
        effort: 0,
        stat: { name: "attack", url: "https://pokeapi.co/api/v2/stat/2/" },
      },
      {
        base_stat: 40,
        effort: 0,
        stat: { name: "defense", url: "https://pokeapi.co/api/v2/stat/3/" },
      },
      {
        base_stat: 50,
        effort: 0,
        stat: {
          name: "special-attack",
          url: "https://pokeapi.co/api/v2/stat/4/",
        },
      },
      {
        base_stat: 50,
        effort: 0,
        stat: {
          name: "special-defense",
          url: "https://pokeapi.co/api/v2/stat/5/",
        },
      },
      {
        base_stat: 90,
        effort: 2,
        stat: { name: "speed", url: "https://pokeapi.co/api/v2/stat/6/" },
      },
    ],
    types: [
      {
        slot: 1,
        type: {
          name: "electric",
          url: "https://pokeapi.co/api/v2/type/13/",
        },
      },
    ],
    weight: 60,
  } as Pokemon;

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokemon, setPokemon] = useState<Pokemon | null>(initialPokemon);
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-evenly gap-3 mb-4 no-print">
        <img
          src="pokemon-23.svg"
          alt="logo"
          className="h-10 w-auto mx-auto sm:mx-0"
        />

        <label className="flex items-center justify-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={fitToPage}
            onChange={() => setFitToPage(!fitToPage)}
          />
          Fit to Page
        </label>

        <div className="w-full sm:w-auto">
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
