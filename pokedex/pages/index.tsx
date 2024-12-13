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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>(''); // Ajout de l'état pour le type sélectionné

  const pokemonTypes = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 
    'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 
    'steel', 'fairy'
  ];

  // Filtrage et tri des Pokémon
  useEffect(() => {
    let filteredPokemons = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Filtrage par type si un type est sélectionné
    if (selectedType) {
      filteredPokemons = filteredPokemons.filter((pokemon) =>
        pokemon.types.some((type) => type.type.name === selectedType)
      );
    }

    // Tri des Pokémon selon le critère choisi
    if (sortCriteria === 'id-asc') {
      filteredPokemons.sort((a, b) => a.id - b.id);
    } else if (sortCriteria === 'id-desc') {
      filteredPokemons.sort((a, b) => b.id - a.id);
    } else if (sortCriteria === 'speed-asc') {
      filteredPokemons.sort((a, b) => {
        const speedA = a.stats.find((stat) => stat.stat.name === 'speed')?.base_stat || 0;
        const speedB = b.stats.find((stat) => stat.stat.name === 'speed')?.base_stat || 0;
        return speedA - speedB;
      });
    } else if (sortCriteria === 'speed-desc') {
      filteredPokemons.sort((a, b) => {
        const speedA = a.stats.find((stat) => stat.stat.name === 'speed')?.base_stat || 0;
        const speedB = b.stats.find((stat) => stat.stat.name === 'speed')?.base_stat || 0;
        return speedB - speedA;
      });
    }

    setSortedPokemons(filteredPokemons);
  }, [pokemons, sortCriteria, searchQuery, selectedType]); // Ajout de selectedType dans les dépendances

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Pokédex</h1>

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher un Pokémon..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={styles.searchBar}
      />

      {/* Filtre par type */}
      <select 
        value={selectedType} 
        onChange={(e) => setSelectedType(e.target.value)} 
        style={styles.filterMenu}
      >
        <option value="">Tous les types</option>
        {pokemonTypes.map((type) => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>

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
          Vitesse ↑
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
    props: { pokemons },
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
  searchBar: {
    width: '80%',
    padding: '10px',
    marginBottom: '20px',
    fontSize: '1rem',
    border: '2px solid #3498db',
    borderRadius: '20px',
  },
  filterMenu: {
    padding: '10px',
    marginBottom: '20px',
    fontSize: '1rem',
    borderRadius: '12px',
    border: '2px solid #3498db',
    backgroundColor: 'white',
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
