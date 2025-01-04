import React from "react";

interface Accommodation {
  location: string;
  name: string;
  type: number; // Number of stars
  price: string;
  address: string;
  description: string;
  link: string;
}

interface AccommodationTableProps {
  accommodations: Accommodation[]; 
}

const AccommodationTable: React.FC<AccommodationTableProps> = ({ accommodations }) => {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Location</th>
          <th>Name</th>
          <th>Type (Stars)</th>
          <th>Price</th>
          <th>Address</th>
          <th>Description</th>
          <th>Link to Book</th>
        </tr>
      </thead>
      <tbody>
        {accommodations.map((accommodation, index) => (
          <tr key={index}>
            <td>{accommodation.location}</td>
            <td>{accommodation.name}</td>
            <td>{accommodation.type} Stars</td>
            <td>{accommodation.price}</td>
            <td>{accommodation.address}</td>
            <td>{accommodation.description}</td>
            <td>
              <a href={accommodation.link} target="_blank" rel="noopener noreferrer">
                Book Now
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AccommodationTable;
