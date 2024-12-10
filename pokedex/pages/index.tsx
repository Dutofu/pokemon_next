// pages/index.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard.module';

interface Pokemon {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  sprites: { front_default: string };
}

const HomePage: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [sortedPokemons, setSortedPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortCriteria, setSortCriteria] = useState<string>('id-asc');

  useEffect(() => {
    const fetchAllPokemons = async () => {
      try {
        setLoading(true);

        // Récupération de tous les Pokémon (1010 max)
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1025`);
        const pokemonList = response.data.results;

        // Récupération des détails de chaque Pokémon
        const allPokemons = await Promise.all(
          pokemonList.map(async (pokemon: { url: string }) => {
            const details = await axios.get(pokemon.url);
            return details.data;
          })
        );

        setPokemons(allPokemons);
        setSortedPokemons(allPokemons);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des Pokémon:', error);
      }
    };

    fetchAllPokemons();
  }, []);

  // Tri des Pokémon en fonction du critère choisi
  useEffect(() => {
    const sorted = [...pokemons];

    if (sortCriteria === 'id-asc') {
      sorted.sort((a, b) => a.id - b.id); // Du premier au dernier
    } else if (sortCriteria === 'id-desc') {
      sorted.sort((a, b) => b.id - a.id); // Du dernier au premier
    } else if (sortCriteria === 'speed-asc') {
      sorted.sort((a, b) => {
        const speedA = a.stats.find((stat) => stat.stat.name === 'speed')?.base_stat || 0;
        const speedB = b.stats.find((stat) => stat.stat.name === 'speed')?.base_stat || 0;
        return speedA - speedB;
      }); // Du moins rapide au plus rapide
    } else if (sortCriteria === 'speed-desc') {
      sorted.sort((a, b) => {
        const speedA = a.stats.find((stat) => stat.stat.name === 'speed')?.base_stat || 0;
        const speedB = b.stats.find((stat) => stat.stat.name === 'speed')?.base_stat || 0;
        return speedB - speedA;
      }); // Du plus rapide au moins rapide
    }

    setSortedPokemons(sorted);
  }, [pokemons, sortCriteria]);

  return (
    <div>
      <h1>Pokédex</h1>

      {/* Menu de tri */}
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="sort">Trier par : </label>
        <select
          id="sort"
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
          style={{ marginLeft: '10px', padding: '5px' }}
        >
          <option value="id-asc">Du premier au dernier (Pokedex)</option>
          <option value="id-desc">Du dernier au premier (Pokedex)</option>
          <option value="speed-asc">Du moins rapide au plus rapide</option>
          <option value="speed-desc">Du plus rapide au moins rapide</option>
        </select>
      </div>

      {loading && <p>Chargement de tous les Pokémon...</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {sortedPokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.sprites.front_default}
            type={pokemon.types.map((type) => type.type.name)}
            hp={pokemon.stats.find((stat) => stat.stat.name === 'hp')?.base_stat || 0}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
