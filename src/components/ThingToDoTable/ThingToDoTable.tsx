import React from "react";

interface ThingToDo {
  location: string;
  name: string;
  type: string;
  address: string;
  description: string;
  website: string;
}

interface ThingToDoTableProps {
  places: ThingToDo[];
}

const ThingToDoTable: React.FC<ThingToDoTableProps> = ({ places }) => {
  return (
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
  );
};

export default ThingToDoTable;
