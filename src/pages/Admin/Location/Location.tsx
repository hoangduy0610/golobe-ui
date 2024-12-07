import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LocationTable from '@/components/LocationTable/LocationTable';

import { LocationType } from '@/types/types';  // Import kiểu LocationType
import { createLocation, fetchLocations } from '@/redux/reducers/locationReducer';
import { create } from 'domain';

const LocationPage = () => {
  const dispatch = useDispatch();
  const { locations, loading, error } = useSelector((state: any) => state.location);
  const [editLocation, setEditLocation] = useState<LocationType | null>(null);

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  const handleEdit = (location: LocationType) => {
    setEditLocation(location);
  };

  const handleSave = () => {
    if (editLocation) {
      dispatch(createLocation(editLocation))
      // dispatch(updateLocationRequest(editLocation));
      setEditLocation(null);
    }
  };

  return (
    <div>
      <h2>Location Management</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      
      {editLocation && (
        <div>
          <input
            type="text"
            value={editLocation.name}
            onChange={(e) => setEditLocation({ ...editLocation, name: e.target.value })}
          />
          <input
            type="text"
            value={editLocation.address}
            onChange={(e) => setEditLocation({ ...editLocation, address: e.target.value })}
          />
          <input
            type="text"
            value={editLocation.description}
            onChange={(e) => setEditLocation({ ...editLocation, description: e.target.value })}
          />
          <input
            type="text"
            value={editLocation.featureImage}
            onChange={(e) => setEditLocation({ ...editLocation, featureImage: e.target.value })}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      )}
      
      <LocationTable locations={locations} onEdit={handleEdit} />
    </div>
  );
};

export default LocationPage;
