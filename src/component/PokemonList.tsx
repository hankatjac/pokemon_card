const PokemonList: React.FC<{ pokemons: string[] }> = ({ pokemons }) => {
  return (
    <div>
      {pokemons.map((p) => (
        <div key={p}>{p}</div>
      ))}
    </div>
  );
};

export default PokemonList;
