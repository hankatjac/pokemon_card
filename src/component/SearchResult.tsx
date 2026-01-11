import React, { useEffect, useState } from "react";
import { type Pokemon, pokeApi, type PokemonSpecies } from "../api/pokeapi";

interface SearchResultProps {
  pokemon: Pokemon | undefined | null;
}

export const SearchResult: React.FC<SearchResultProps> = ({ pokemon }) => {
  const [species, setSpecies] = useState<PokemonSpecies | undefined>();
  
  useEffect(() => {
    const fetchSpecies = async () => {
      if (pokemon) {
        const response = await pokeApi.getPokemonSpecies(pokemon);
        setSpecies(response.data);
      }
    };
    fetchSpecies();
  }, [pokemon]);

  if (pokemon === undefined) {
    return <></>;
  }
  if (pokemon === null) {
    return <div>no pokemon find</div>;
  }
  return (
    <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
      {/* Image Header with Background Gradient */}
      <div className="bg-gradient-to-br from-blue-400 to-indigo-500 p-8 flex justify-center">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-48 h-48 drop-shadow-2xl transform transition-transform hover:scale-110"
        />
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h1 className="text-3xl font-black text-gray-800 capitalize mb-2">
          {pokemon.name}
        </h1>

        <p className="text-gray-600 text-sm leading-relaxed italic mb-6">
          "
          {species?.flavor_text_entries
            .find((f) => f.language.name === "en")
            ?.flavor_text.replace(/\f/g, " ")}
          "
        </p>

        {/* Abilities Section */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Abilities
          </h2>
          <div className="flex flex-wrap gap-2">
            {pokemon.abilities.map((ability) => (
              <span
                key={ability.ability.url}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full border border-gray-200 capitalize"
              >
                {ability.ability.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
