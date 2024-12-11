import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import styles from './PokemonDetail.module.css';

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
    <div className={styles.container}>
      <h1 className={styles.title}>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} className={styles.image} />
      <p className={styles.info}>Height: {pokemon.height} decimetres</p>
      <p className={styles.info}>Weight: {pokemon.weight} hectograms</p>
      <div>
        {pokemon.types.map((type) => (
          <span key={type.type.name} className={styles.type}>
            {type.type.name}
          </span>
        ))}
      </div>
      <ul className={styles.stats}>
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

  const paths = pokemonList.map((pokemon: { name: string }) => ({
    params: { id: pokemon.name },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params!;
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon = response.data;

  return {
    props: { pokemon },
  };
};

export default PokemonDetail;
