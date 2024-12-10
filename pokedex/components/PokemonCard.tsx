// components/PokemonCard.tsx
import React from 'react';
import Link from 'next/link';

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  type: string[];
  hp: number;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, image, type, hp }) => {
  return (
    <Link href={`/pokemon/${name}`} passHref>
      <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', margin: '10px', cursor: 'pointer' }}>
        <img src={image} alt={name} width={100} height={100} />
        <h3>{name}</h3>
        <p>Type: {type.join(', ')}</p>
        <p>HP: {hp}</p>
      </div>
    </Link>
  );
};

export default PokemonCard;
