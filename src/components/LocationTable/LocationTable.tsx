import React from "react";

interface Location {
  continent: string;
  country: string;
  province: string;
  district: string;
}

interface LocationTableProps {
  locations: Location[]; 
}

const LocationTable: React.FC<LocationTableProps> = ({ locations }) => {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Continent</th>
          <th>Country</th>
          <th>Province</th>
          <th>District</th>
        </tr>
      </thead>
      <tbody>
        {locations.map((location, index) => (
          <tr key={index}>
            <td>{location.continent}</td>
            <td>{location.country}</td>
            <td>{location.province}</td>
            <td>{location.district}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LocationTable;
