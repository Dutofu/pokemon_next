// pages/pokemon/[id].tsx
import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';

interface PokemonDetailProps {
  pokemon: {
    id: number;
    name: string;
    types: { type: { name: string } }[];
    stats: { base_stat: number; stat: { name: string } }[];
    sprites: { front_default: string };
  };
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemon }) => {
  return (
    <div>
      <h1>{pokemon.name}</h1>
      {/* <img src={pokemon.sprites.front_default} alt={pokemon.name} /> */}
      <p>Type: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
      <p>HP: {pokemon.stats.find((stat) => stat.stat.name === 'hp')?.base_stat || 0}</p>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
  const pokemonList = response.data.results;

  const paths = pokemonList.map((pokemon: { name: string }) => ({
    params: { id: pokemon.name },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params!;
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon = response.data;

  return { props: { pokemon } };
};

export default PokemonDetail;
