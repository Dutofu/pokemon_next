import { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';

interface Pokemon {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  sprites: { front_default: string };
}

const HomePage: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const limit = 20; // Charger par groupes de 20 Pokémon

  useEffect(() => {
    const fetchPokemons = async () => {
      if (loading) return;

      setLoading(true);
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
      const pokemonList = response.data.results;

      const newPokemons = await Promise.all(
        pokemonList.map(async (pokemon: { url: string }) => {
          const details = await axios.get(pokemon.url);
          return details.data;
        })
      );

      setPokemons((prev) => [...prev, ...newPokemons]);
      setHasMore(newPokemons.length > 0); // Si aucun nouveau Pokémon, arrêter le chargement
      setLoading(false);
    };

    fetchPokemons();
  }, [offset]);

  const loadMore = () => {
    if (loading || !hasMore) return;
    setOffset((prev) => prev + limit);
  };

  return (
    <div>
      <h1>Pokédex</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            name={pokemon.name}
            image={pokemon.sprites.front_default}
            type={pokemon.types.map((type) => type.type.name)}
            hp={pokemon.stats.find((stat) => stat.stat.name === 'hp')?.base_stat || 0}
          />
        ))}
      </div>
      {loading && <p>Chargement...</p>}
      {hasMore && !loading && (
        <button onClick={loadMore} style={{ marginTop: '20px' }}>
          Charger plus
        </button>
      )}
    </div>
  );
};

export default HomePage;