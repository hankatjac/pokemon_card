import { useEffect, useState } from "react";
import { type Pokemon, pokeApi, type PokemonSpecies } from "../api/pokeapi";

const PokemonCard = ({ pokemon }: { pokemon: Pokemon | null }) => {
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

  if (pokemon === undefined) return <></>;
  if (pokemon === null) return <div>No Pokémon found</div>;

  const flavor =
    species?.flavor_text_entries
      .find((f) => f.language.name === "en")
      ?.flavor_text.replace(/\f/g, " ") ?? "";

  const color = species?.color?.name ?? "gray";

  const colorMap: Record<string, string> = {
    red: "from-red-400 to-red-600",
    blue: "from-blue-400 to-blue-600",
    green: "from-green-400 to-green-600",
    yellow: "from-yellow-300 to-yellow-500",
    purple: "from-purple-400 to-purple-600",
    brown: "from-amber-600 to-amber-800",
    pink: "from-pink-300 to-pink-500",
    gray: "from-gray-400 to-gray-600",
    black: "from-gray-800 to-black",
    white: "from-gray-200 to-gray-400",
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
      {/* Header */}
      <div
        className={`p-8 flex justify-center bg-gradient-to-br ${colorMap[color]}`}
      >
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          className="w-48 h-48 drop-shadow-2xl transition-transform hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-black text-gray-800 capitalize">
          {pokemon.name}
        </h1>

        {/* Types */}
        <div className="flex gap-2">
          {pokemon.types.map((t) => (
            <span
              key={t.type.name}
              className="px-3 py-1 rounded-full text-white text-sm capitalize"
              style={{
                backgroundColor: `var(--type-${t.type.name}, #666)`,
              }}
            >
              {t.type.name}
            </span>
          ))}
        </div>

        {/* Flavor Text */}
        <p className="text-gray-600 text-sm italic leading-relaxed">
          "{flavor}"
        </p>

        {/* Basic Info */}
        <div className="grid grid-cols-3 text-center gap-4">
          <div>
            <p className="text-xs text-gray-500">Height</p>
            <p className="font-semibold">{pokemon.height / 10} m</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Weight</p>
            <p className="font-semibold">{pokemon.weight / 10} kg</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Base XP</p>
            <p className="font-semibold">{pokemon.base_experience}</p>
          </div>
        </div>

        {/* Abilities */}
        <div>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
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

        {/* Stats */}
        <div>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            Stats
          </h2>
          <div className="space-y-3">
            {pokemon.stats.map((s) => (
              <div key={s.stat.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize">{s.stat.name}</span>
                  <span>{s.base_stat}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-indigo-500"
                    style={{ width: `${(s.base_stat / 150) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;