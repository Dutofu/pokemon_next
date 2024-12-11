// pages/index.tsx
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';
import React, { useState, useEffect } from 'react';

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
  const [sortedPokemons, setSortedPokemons] = React.useState<Pokemon[]>(pokemons);
  const [sortCriteria, setSortCriteria] = React.useState<string>('id-asc');

  React.useEffect(() => {
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
  }, [sortCriteria, pokemons]);

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

      {/* Liste des Pokémon */}
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

// Utilisation de getStaticProps pour SSG
export async function getStaticProps() {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`); // Limite à 151 pour la première génération
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
