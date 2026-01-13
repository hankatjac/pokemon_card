const PokemonList: React.FC<{
  pokemons: { name: string; image: string }[];
}> = ({ pokemons }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {pokemons.map((p) => (
        <div key={p.name} className="flex flex-col items-center">
          <img src={p.image} alt={p.name} className="w-20 h-20" />
          <div className="mt-2 font-semibold">{p.name}</div>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
