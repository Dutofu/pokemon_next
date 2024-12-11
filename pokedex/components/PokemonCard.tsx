import React from 'react';
import Link from 'next/link';

// Fonction pour obtenir la couleur de fond en fonction du type
const getTypeColor = (type: string) => {
  const typeColors: { [key: string]: string } = {
    electric: 'yellow',
    water: 'blue',
    fire: 'red',
    grass: 'green',
    bug: 'lightgreen',
    ice: 'lightblue',
    dragon: 'blueviolet',
    fairy: 'pink',
    psychic: 'plum',
    dark: 'black',
    ghost: 'brown',
    ground: 'brown',
    normal: 'gray',
    steel: 'lightgray',
    flying: 'steelblue',
    rock: 'darkgray',
    poison: 'purple',
    fighting: 'chocolate',
  };

  return typeColors[type] || 'white'; // Blanc par défaut si le type est inconnu
};

// Fonction pour déterminer si le texte doit être noir ou blanc
const getTextColor = (backgroundColor: string) => {
  const lightColors = ['yellow', 'lightgreen', 'lightblue', 'pink', 'lightgray', 'white'];
  return lightColors.includes(backgroundColor) ? 'black' : 'white';
};

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  type: string[];
  hp: number;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, image, type, hp }) => {
  return (
    <Link href={`/pokemon/${name}`} passHref style={{ textDecoration: 'none' }}>
      <div
        style={{
          border: '1px solid #ccc',
          padding: '10px',
          borderRadius: '5px',
          margin: '10px',
          cursor: 'pointer',
          textAlign: 'center',
          textDecoration: 'none', // Supprime le soulignement
        }}
      >
        <img src={image} alt={name} width={100} height={100} />
        <h3>{name}</h3>

        {/* Affichage des types avec couleur de fond */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', margin: '10px 0' }}>
          {type.map((t) => {
            const backgroundColor = getTypeColor(t);
            const textColor = getTextColor(backgroundColor);

            return (
              <span
                key={t}
                style={{
                  backgroundColor,
                  color: textColor,
                  padding: '5px 10px',
                  borderRadius: '5px',
                  fontSize: '0.9em',
                  textDecoration: 'none', // Supprime le soulignement
                }}
              >
                {t}
              </span>
            );
          })}
        </div>

        <p>HP: {hp}</p>
      </div>
    </Link>
  );
};

export default PokemonCard;
