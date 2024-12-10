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
    height: number;
    weight: number;
  };
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemon }) => {
  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Type: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
      <p>HP: {pokemon.stats.find((stat) => stat.stat.name === 'hp')?.base_stat || 0}</p>
      <p>Height: {pokemon.height} decimetres</p>
      <p>Weight: {pokemon.weight} hectograms</p>
      <p>
        <strong>Stats:</strong>
      </p>
      <ul>
        {pokemon.stats.map((stat) => (
          <li key={stat.stat.name}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
  const pokemonList = response.data.results;

  const paths = pokemonList.map((pokemon: { url: string }) => {
    const id = pokemon.url.split('/')[6]; // Extrait l'ID à partir de l'URL
    return { params: { id } }; // Utilise l'ID dans les params
  });

  return {
    paths,
    fallback: 'blocking', // Assure-toi que la page est générée dynamiquement pour tous les Pokémon
  };
};



export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params!; // `id` ici sera le nom du Pokémon
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon = response.data;

  return {
    props: { pokemon },
  };
};

export default PokemonDetail; 