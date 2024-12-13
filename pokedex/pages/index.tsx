import { useState, useEffect } from 'react'; 
import PokemonCard from '../components/PokemonCard';
import axios from 'axios';

interface Pokemon {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  sprites: { front_default: string };
}

interface HomePageProps {
  pokemons: Pokemon[];
}

const HomePage: React.FC<HomePageProps> = ({ pokemons }) => {
  const [sortedPokemons, setSortedPokemons] = useState<Pokemon[]>(pokemons);
  const [sortCriteria, setSortCriteria] = useState<string>('id-asc');

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
        const speedB = a.stats.find((stat) => stat.stat.name === 'speed')?.base_stat || 0;
        return speedB - speedA;
      }); // Du plus rapide au moins rapide
    }

    setSortedPokemons(sorted);
  }, [pokemons, sortCriteria]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Pokédex</h1>

      {/* Menu de tri */}
      <div style={styles.sortMenu}>
        <button
          style={{ ...styles.button, ...(sortCriteria === 'id-asc' ? styles.activeButton : {}) }}
          onClick={() => setSortCriteria('id-asc')}
        >
          Pokedex ↑
        </button>
        <button
          style={{ ...styles.button, ...(sortCriteria === 'id-desc' ? styles.activeButton : {}) }}
          onClick={() => setSortCriteria('id-desc')}
        >
          Pokedex ↓
        </button>
        <button
          style={{ ...styles.button, ...(sortCriteria === 'speed-asc' ? styles.activeButton : {}) }}
          onClick={() => setSortCriteria('speed-asc')}
        >
          Vitesse 
        </button>
        <button
          style={{ ...styles.button, ...(sortCriteria === 'speed-desc' ? styles.activeButton : {}) }}
          onClick={() => setSortCriteria('speed-desc')}
        >
          Vitesse ↓
        </button>
      </div>

      <div style={styles.cardContainer}>
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

export async function getStaticProps() {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`);
  const pokemonList = response.data.results;

  const pokemons = await Promise.all(
    pokemonList.map(async (pokemon: { url: string }) => {
      const details = await axios.get(pokemon.url);
      return details.data;
    })
  );

  return {
    props: { pokemons }, // Les données sont passées comme props à la page
  };
}

export default HomePage;

// Styles
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem',
    color: '#2c3e50',
    marginBottom: '20px',
  },
  sortMenu: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '20px',
    border: '2px solid #3498db',
    backgroundColor: 'white',
    color: '#3498db',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  activeButton: {
    backgroundColor: '#3498db',
    color: 'white',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
  },
};
