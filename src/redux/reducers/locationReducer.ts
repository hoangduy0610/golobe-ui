import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocationType } from '@/types/types';
import { locationSliceNamespace } from '../actions/locationActions';

interface LocationState {
  loading: boolean;
  locations: LocationType[];
  error: string | null;
}

const initialState: LocationState = {
  loading: false,
  locations: [],
  error: null,
};

const locationSlice = createSlice({
  name: locationSliceNamespace,
  initialState,
  reducers: {
    fetchLocations(state) {
      state.loading = true;
      state.error = null;
      state.locations = [];
    },
    fetchLocationsSuccess(state, action: PayloadAction<LocationType[]>) {
      state.loading = false;
      state.locations = action.payload;
      state.error = null;
    },
    fetchLocationsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.locations = [];
    },
    createLocation(state, action: PayloadAction<Omit<LocationType, "id">>) {
      state.loading = true;
      state.error = null;
    },
    createLocationSuccess(state, action: PayloadAction<LocationType>) {
      state.loading = false;
      state.locations.push(action.payload);
      state.error = null;
    },
    createLocationFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateLocation(state, action: PayloadAction<LocationType>) {
      state.loading = true;
      state.error = null;
    },
    updateLocationSuccess(state, action: PayloadAction<LocationType>) {
      state.loading = false;
      const index = state.locations.findIndex(location => location.id === action.payload.id);
      if (index !== -1) {
        state.locations[index] = action.payload;
      }
      state.error = null;
    },
    updateLocationFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteLocation(state, action: PayloadAction<number>) {
      state.loading = true;
      state.error = null;
    },
    deleteLocationSuccess(state, action: PayloadAction<number>) {
      state.loading = false;
      state.locations = state.locations.filter(location => location.id !== action.payload);
      state.error = null;
    },
    deleteLocationFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchLocations,
  fetchLocationsSuccess,
  fetchLocationsFailure,
  createLocation,
  createLocationSuccess,
  createLocationFailure,
  updateLocation,
  updateLocationSuccess,
  updateLocationFailure,
  deleteLocation,
  deleteLocationSuccess,
  deleteLocationFailure,
} = locationSlice.actions;

export default locationSlice.reducer;
