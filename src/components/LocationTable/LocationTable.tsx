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
                <div className="d-flex gap-2 justify-content-center text-center">
                  <button className="btn btn-primary" onClick={() => onEdit(location)}>
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="btn btn-danger" onClick={() => onDelete(location.id)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LocationTable;
