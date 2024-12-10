import React from 'react';
import Link from 'next/link';
import styles from './PokemonCard.module.css';

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  type: string[];
  hp: number;
}

const PokemonCard: React.FC<PokemonCardProps> = ({name, image, type, hp }) => {
  return (
    <Link href={`/pokemon/${name}`} passHref>
      <div className={styles.card}>
        <img src={image} alt={name} className={styles.image} />
        <h3 className={styles.title}>
          <span>{name}</span>
        </h3>
        <p className={styles.type}>Type: {type.join(', ')}</p>
        <p className={styles.hp}>HP: {hp}</p>
      </div>
    </Link>
  );
};

export default PokemonCard;
