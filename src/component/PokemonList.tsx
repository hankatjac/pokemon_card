import { type Pokemon } from "../api/pokeapi";

const PokemonList: React.FC<{
  pokemons: Pokemon[];
  pokemon: Pokemon | null;
  setPokemon: React.Dispatch<React.SetStateAction<Pokemon | null>>;
  loading?: boolean;
}> = ({ pokemons, setPokemon, loading }) => {
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

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 overflow-y-auto h-[75vh] ">
      {pokemons.map((p) => (
        <div
          key={p.name}
          className="flex flex-col items-center"
          onClick={() => {
            setPokemon(p);
            // Only scroll on mobile screens (below md breakpoint: 768px)
            if (window.innerWidth < 768) {
              window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: "smooth",
              });
            }
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
  );
};

export default PokemonList;
