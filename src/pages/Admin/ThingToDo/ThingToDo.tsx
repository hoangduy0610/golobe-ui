import React from "react";

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
    <div className="thing-to-do-container">
      <h2>Thing to Do Management</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Location</th>
            <th>Name</th>
            <th>Type</th>
            <th>Address</th>
            <th>Description</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {places.map((place, index) => (
            <tr key={index}>
              <td>{place.location}</td>
              <td>{place.name}</td>
              <td>{place.type}</td>
              <td>{place.address}</td>
              <td>{place.description}</td>
              <td>
                <a href={place.website} target="_blank" rel="noopener noreferrer">
                  {place.website}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ThingToDo;
