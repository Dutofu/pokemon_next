// components/PokemonCard.tsx
import React from 'react';

interface PokemonCardProps {
  name: string;
  image: string;
  type: string[];
  hp: number;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, type, hp }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', margin: '10px' }}>
      {/* <img src={image} alt={name} width={100} height={100} /> */}
      <h3>{name}</h3>
      <p>Type: {type.join(', ')}</p>
      <p>HP: {hp}</p>
    </div>
  );
};

export default PokemonCard;
