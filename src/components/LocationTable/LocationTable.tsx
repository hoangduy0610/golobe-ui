import React from 'react';
import { LocationType } from '@/types/types';

interface LocationTableProps {
  locations: LocationType[];
  onEdit: (location: LocationType) => void;
  onDelete: (id: number) => void;
  onCreate: () => void;
}

const LocationTable: React.FC<LocationTableProps> = ({ locations, onEdit, onDelete, onCreate }) => {
  return (
    <div>
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
          {locations.map((location) => (
            <tr key={location.id}>
              <td>{location.name}</td>
              <td>{location.address}</td>
              <td>{location.description}</td>
              <td>{location.featureImage}</td>
              <td>
                <button onClick={() => onEdit(location)} className="btn btn-warning">
                  Edit
                </button>
                <button onClick={() => onDelete(location.id)} className="btn btn-danger ms-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LocationTable;