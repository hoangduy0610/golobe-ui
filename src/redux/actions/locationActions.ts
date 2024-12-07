
import { LocationType } from '@/types/types'
// Action Types
export const locationSliceNamespace = 'location'

// Action Creators
export const locationActionNames = {
  FETCH_LOCATION: `${locationSliceNamespace}/fetchLocations`,
  FETCH_LOCATION_SUCCESS: `${locationSliceNamespace}/fetchLocationsSuccess`,
  FETCH_LOCATION_FAILURE: `${locationSliceNamespace}/fetchLocationsFailure`,

  // CREATE_LOCATION:,

}



// export const fetchLocationsSuccess = (locations: any[]) => ({
//   type: FETCH_LOCATIONS_SUCCESS,
//   payload: locations,
// });fetchLocationsSuccess, fetchLocationsFailure


// export const fetchLocationsFailure = (error: string) => ({
//   type: FETCH_LOCATIONS_FAILURE,
//   payload: error,
// });

// // Tạo mới location
// export const createLocationRequest = (location: LocationType) => ({
//   type: CREATE_LOCATION_REQUEST,
//   payload: location,
// });

// export const createLocationSuccess = (location: LocationType) => ({
//   type: CREATE_LOCATION_SUCCESS,
//   payload: location,
// });

// export const createLocationFailure = (error: string) => ({
//   type: CREATE_LOCATION_FAILURE,
//   payload: error,
// });

// // Cập nhật location
// export const updateLocationRequest = (location: LocationType) => ({
//   type: UPDATE_LOCATION_REQUEST,
//   payload: location,
// });

// export const updateLocationSuccess = (location: LocationType) => ({
//   type: UPDATE_LOCATION_SUCCESS,
//   payload: location,
// });

// export const updateLocationFailure = (error: string) => ({
//   type: UPDATE_LOCATION_FAILURE,
//   payload: error,
// });

// // Xóa location
// export const deleteLocationRequest = (id: string) => ({
//   type: DELETE_LOCATION_REQUEST,
//   payload: id,
// });

// export const deleteLocationSuccess = (id: string) => ({
//   type: DELETE_LOCATION_SUCCESS,
//   payload: id,
// });

// export const deleteLocationFailure = (error: string) => ({
//   type: DELETE_LOCATION_FAILURE,
//   payload: error,
// });
