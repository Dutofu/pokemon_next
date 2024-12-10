import { useState } from "react";
import "./Card.css";

interface CardProps {
  src: string;
  title: string;
  setCollectionCount: (count: (prevCount: number) => number) => void;
  visible: boolean;
}

export function Card({ src, title, setCollectionCount, visible }: CardProps) {
  const [clicked, setClicked] = useState(false);

  const handleAddToCollection = () => {
    setCollectionCount((prevCount: number) => prevCount + 1);
    setClicked(true);
  };

  return (
    <li
      onClick={handleAddToCollection}
      style={{ display: visible ? "block" : "none" }}
    >
      <img
        src={src}
        alt={`Image ${title}`}
        className={`image ${!clicked && "filter-grey"}`}
      />
      <div className={"name"}>{title}</div>
    </li>
  );
}
