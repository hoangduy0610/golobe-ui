import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LocationTable from '@/components/LocationTable/LocationTable';
import { LocationType } from '@/types/types';
import { fetchLocations, createLocation, updateLocation, deleteLocation } from '@/redux/reducers/locationReducer';

const LocationPage = () => {
  const dispatch = useDispatch();
  const { locations, loading, error } = useSelector((state: any) => state.location);
  const [editLocation, setEditLocation] = useState<LocationType | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newLocation, setNewLocation] = useState<Omit<LocationType, 'id'>>({
    name: '',
    address: '',
    description: '',
    featureImage: '',
  });

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  const handleCreate = () => {
    setIsFormVisible(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createLocation(newLocation));
    setIsFormVisible(false);
    setNewLocation({
      name: '',
      address: '',
      description: '',
      featureImage: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLocation({
      ...newLocation,
      [name]: value,
    });
  };

  const handleEdit = (location: LocationType) => {
    setEditLocation(location);
  };

  const handleSave = () => {
    if (editLocation) {
      dispatch(updateLocation(editLocation));
      setEditLocation(null);
    }
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
    setNewLocation({
      name: '',
      address: '',
      description: '',
      featureImage: ''
    });
  };

  const handleDelete = (id: number) => {
    dispatch(deleteLocation(id));
  };

  return (
    <div>
      <h2>Location Management</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <button onClick={handleCreate} className="btn btn-primary mb-3">
        Create New Location
      </button>

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="mb-3">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={newLocation.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={newLocation.address}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={newLocation.description}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Feature Image</label>
            <input
              type="text"
              name="featureImage"
              value={newLocation.featureImage}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-success mt-3">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-secondary mt-3 ms-2"
            onClick={handleCloseForm}
          >
            Close
          </button>
        </form>
      )}

      {editLocation && (
        <div>
          <h3>Edit Location</h3>
          <input
            type="text"
            value={editLocation.name}
            onChange={(e) => setEditLocation({ ...editLocation, name: e.target.value })}
            className="form-control mb-2"
          />
          <input
            type="text"
            value={editLocation.address}
            onChange={(e) => setEditLocation({ ...editLocation, address: e.target.value })}
            className="form-control mb-2"
          />
          <input
            type="text"
            value={editLocation.description}
            onChange={(e) => setEditLocation({ ...editLocation, description: e.target.value })}
            className="form-control mb-2"
          />
          <input
            type="text"
            value={editLocation.featureImage}
            onChange={(e) => setEditLocation({ ...editLocation, featureImage: e.target.value })}
            className="form-control mb-2"
          />
          <button onClick={handleSave} className="btn btn-warning mt-2">
            Save
          </button>
          <button
            onClick={() => setEditLocation(null)}
            className="btn btn-secondary mt-2 ms-2"
          >
            Close
          </button>
        </div>
      )}

      <LocationTable
        locations={locations}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
      />
    </div>
  );
};

export default LocationPage;
