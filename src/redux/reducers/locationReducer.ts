// src/redux/reducers/locationReducers.ts
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
    createLocation(state, action: PayloadAction<LocationType>) {
      
    }
  },
});

export const { fetchLocations, fetchLocationsSuccess, fetchLocationsFailure, createLocation } = locationSlice.actions;
export default locationSlice.reducer;
