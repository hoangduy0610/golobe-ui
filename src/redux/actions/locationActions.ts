
import { LocationType } from '@/types/types'

export const locationSliceNamespace = 'location'

// Action 
export const locationActionNames = {
  FETCH_LOCATION: `${locationSliceNamespace}/fetchLocations`,
  FETCH_LOCATION_SUCCESS: `${locationSliceNamespace}/fetchLocationsSuccess`,
  FETCH_LOCATION_FAILURE: `${locationSliceNamespace}/fetchLocationsFailure`,

  CREATE_LOCATION: `${locationSliceNamespace}/createLocation`,
  CREATE_LOCATION_SUCCESS: `${locationSliceNamespace}/createLocationSuccess`,
  CREATE_LOCATION_FAILURE: `${locationSliceNamespace}/createLocationFailure`,

  UPDATE_LOCATION: `${locationSliceNamespace}/updateLocation`,
  UPDATE_LOCATION_SUCCESS: `${locationSliceNamespace}/updateLocationSuccess`,
  UPDATE_LOCATION_FAILURE: `${locationSliceNamespace}/updateLocationFailure`,

  DELETE_LOCATION: `${locationSliceNamespace}/deleteLocation`,
  DELETE_LOCATION_SUCCESS: `${locationSliceNamespace}/deleteLocationSuccess`,
  DELETE_LOCATION_FAILURE: `${locationSliceNamespace}/deleteLocationFailure`,

}




