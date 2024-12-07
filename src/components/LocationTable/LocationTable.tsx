import React from 'react';
import { LocationType } from '@/types/types';  // Import kiểu LocationType

interface LocationTableProps {
  locations: LocationType[];
  onEdit: (location: LocationType) => void;
}

const LocationTable: React.FC<LocationTableProps> = ({ locations, onEdit }) => {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Description</th>
          <th>Feature Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {locations.map((location, index) => (
          <tr key={index}>
            <td>{location.name}</td>
            <td>{location.address}</td>
            <td>{location.description}</td>
            <td>{location.featureImage}</td>
            <td>
              <button onClick={() => onEdit(location)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LocationTable;
