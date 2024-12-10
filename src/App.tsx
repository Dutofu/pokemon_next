import { useState } from "react";
import "./App.css";
import { Card } from "./components/Card";
import "destyle.css";

export default function App() {
  const [collectionCount, setCollectionCount] = useState(0);
  const [filterType, setFilterType] = useState<string>("All");

  const images = Array.from({ length: 9 }, (_, i) => `/${i + 1}.png`);
  const pokemons = [
    { title: "Pikachu", type: "Electrique" },
    { title: "Carapuce", type: "Eau" },
    { title: "Salamèche", type: "Feu" },
    { title: "Léviathan", type: "Eau" },
    { title: "Salamèche", type: "Feu" },
    { title: "Alakazam", type: "Psy" },
    { title: "Mewtwo", type: "Psy" },
    { title: "Dracaufeu", type: "Feu" },
    { title: "Carapuce", type: "Eau" },
  ];

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(event.target.value);
  };

  const filteredIndexes = pokemons.map((pokemon) => ({
    ...pokemon,
    visible: filterType === "All" || pokemon.type === filterType,
  }));

  return (
    <>
      <div className={"fixed-title"}>
        <h1 className={"title"}>{"Tracker Pokemon TCGP"}</h1>
        <h2 className={"title"}>
          {"Collection: "}
          {collectionCount}
        </h2>
      </div>

      <select
        onChange={handleFilterChange}
        value={filterType}
        className="custom-select"
      >
        <option value="All">All</option>
        <option value="Electrique">Electrique</option>
        <option value="Eau">Eau</option>
        <option value="Feu">Feu</option>
        <option value="Psy">Psy</option>
      </select>
      <ul className="image-grid">
        {filteredIndexes.map((item, index) => (
          <Card
            key={index}
            src={images[index]}
            title={item.title}
            setCollectionCount={setCollectionCount}
            visible={item.visible}
          />
        ))}
      </ul>
    </>
  );
}
