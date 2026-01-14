// import { useState } from "react";
// import Modal from "./Modal";
import { type Pokemon } from "../api/pokeapi";

const PokemonList: React.FC<{
  pokemons: Pokemon[];
  pokemon: Pokemon | null;
  setPokemon: React.Dispatch<React.SetStateAction<Pokemon | null>>;
}> = ({ pokemons, setPokemon }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {pokemons.map((p) => (
          <div
            key={p.name}
            className="flex flex-col items-center"
            onClick={() => {
              setPokemon(p);
            }}
          >
            <img
              src={p.sprites.other["official-artwork"].front_default}
              alt={p.name}
              className="w-20 h-20"
            />
            <div className="mt-2 font-semibold">{p.name}</div>
          </div>
        ))}
      </div>
      {/* {pokemon && <Modal show={show} setShow={setShow} pokemon={pokemon} />} */}
    </>
  );
};

export default PokemonList;
