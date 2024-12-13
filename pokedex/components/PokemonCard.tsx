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
  generation: number;  // Ajout du champ génération
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, image, type, hp, generation }) => {
  return (
    <Link href={`/pokemon/${name}`} passHref style={{ textDecoration: 'none' }}>
      <div
        style={{
          border: '1px solid #d1d1d1',
          borderRadius: '12px',
          padding: '16px',
          margin: '16px',
          background: 'linear-gradient(145deg, #f8f8f8, #e0e0e0)',
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1), 0 -2px 4px rgba(255, 255, 255, 0.1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          cursor: 'pointer',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          height: '300px',
          width: '220px',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-8px)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.2)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.1), 0 -2px 4px rgba(255, 255, 255, 0.1)';
        }}
      >
        {/* Affichage du numéro du Pokémon */}
        <div className="pokemon-number">{`#${id}`}</div>

        <img
          src={image}
          alt={name}
          style={{
            width: '120px',
            height: '120px',
            objectFit: 'cover',
            margin: '0 auto 16px',
            borderRadius: '50%',
            border: '2px solid #888',
            background: 'radial-gradient(circle at center, #fff 50%, transparent 70%)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)';
          }}
        />
        <h3
          style={{
            fontSize: '1.4rem',
            fontWeight: 'bold',
            margin: '8px 0',
            color: '#2c3e50',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
            textTransform: 'capitalize',
          }}
        >
          {name}
        </h3>

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
                  textDecoration: 'none',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
                }}
              >
                {t}
              </span>
            );
          })}
        </div>

        <p style={{ fontSize: '1rem', fontWeight: '500', color: '#e74c3c' }}>HP: {hp}</p>
      </div>
    </Link>
  );
};

export default PokemonCard;
