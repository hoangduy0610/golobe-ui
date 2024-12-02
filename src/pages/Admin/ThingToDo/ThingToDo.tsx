import React from "react";
import ThingToDoTable from "@/components/ThingToDoTable/ThingToDoTable";

const ThingToDo = () => {
  const places = [
    {
      location: "New York",
      name: "Statue of Liberty",
      type: "Historical",
      address: "Liberty Island, New York, USA",
      description: "An iconic symbol of freedom, offering scenic views of New York Harbor.",
      website: "https://www.nps.gov/stli/index.htm"
    },
    {
      location: "Paris",
      name: "Eiffel Tower",
      type: "Landmark",
      address: "Champ de Mars, 5 Avenue Anatole, Paris, France",
      description: "A wrought-iron lattice tower offering breathtaking views of Paris.",
      website: "https://www.toureiffel.paris/en"
    },
    {
      location: "Tokyo",
      name: "Tokyo Skytree",
      type: "Observation Deck",
      address: "1 Chome-1-2 Oshiage, Sumida City, Tokyo, Japan",
      description: "The tallest structure in Japan, with panoramic views of the city.",
      website: "https://www.tokyo-skytree.jp/en/"
    }
  ];

  return (
    <div>
      <h2>Thing to Do Management</h2>
      <ThingToDoTable places={places} />
    </div>
  );
};

export default ThingToDo;
