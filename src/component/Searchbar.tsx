import React, { useState, type ChangeEvent, type FormEvent } from "react";

interface SearchBarProps {
  onSearch: (pokemon: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [pokemonName, setPokemonName] = useState("");

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPokemonName(e.target.value);
  };
  const searchForPokemon = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(pokemonName);
  };
  return (
    <form
      onSubmit={searchForPokemon}
      className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto p-4"
    >
      <input
        value={pokemonName}
        placeholder="Search for Pokémon..."
        onChange={handleNameChange}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md active:transform active:scale-95"
      >
        Search
      </button>
    </form>
  );
};
