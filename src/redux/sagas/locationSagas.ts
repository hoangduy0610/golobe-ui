import { call, put, takeLatest } from 'redux-saga/effects';
import { locationActionNames } from '../actions/locationActions'; // Import các action đã sửa

import { locationApis } from '@/redux/apis/locationApis'; // Import locationApis
import { 
  fetchLocationsFailure, 
  fetchLocationsSuccess, 
  createLocationFailure, 
  createLocationSuccess, 
  updateLocationFailure, 
  updateLocationSuccess, 
  deleteLocationFailure, 
  deleteLocationSuccess, 
  createLocation, 
  updateLocation, 
  deleteLocation 
} from '../reducers/locationReducer';
import { PayloadAction } from '@reduxjs/toolkit';

// Lấy danh sách locations
function* fetchLocationsSaga(): Generator<any, void, any> {
  try {
    const response = yield call(locationApis.getList);
    yield put(fetchLocationsSuccess(response.data));
  } catch (error: any) {
    console.log(error);
    yield put(fetchLocationsFailure(error.message));
  }
}

// Tạo mới location
function* createLocationSaga(action: ReturnType<typeof createLocation>): Generator<any, void, any> {
  try {
    const response = yield call(locationApis.create, action.payload);
    yield put(createLocationSuccess(response.data));
  } catch (error: any) {
    console.log(error);
    yield put(createLocationFailure(error.message));
  }
}

// Cập nhật location
function* updateLocationSaga(action: ReturnType<typeof updateLocation>): Generator<any, void, any> {
  try {
    const { id, ...locationData } = action.payload;
    const response = yield call(locationApis.edit, id, locationData);
    yield put(updateLocationSuccess(response.data));
  } catch (error: any) {
    console.log(error);
    yield put(updateLocationFailure(error.message));
  }
}

function* deleteLocationSaga(action: PayloadAction<{id:number}>): Generator<any, void, any> {
  try {
    yield call(locationApis.delete, action.payload.id);
    yield put(deleteLocationSuccess(action.payload.id));
  } catch (error: any) {
    console.log(error);
    yield put(deleteLocationFailure(error.message));
  }
}

// Lắng nghe các action và chạy các saga
export function* watchFetchLocationSagas() {
  yield takeLatest(locationActionNames.FETCH_LOCATION, fetchLocationsSaga);
}

export function* watchCreateLocationSagas() {
  yield takeLatest(locationActionNames.CREATE_LOCATION, createLocationSaga);
}

export function* watchUpdateLocationSagas() {
  yield takeLatest(locationActionNames.UPDATE_LOCATION, updateLocationSaga);
}

export function* watchDeleteLocationSagas() {
  yield takeLatest(locationActionNames.DELETE_LOCATION, deleteLocationSaga);
}

const locationSagas = [
  watchFetchLocationSagas,
  watchCreateLocationSagas,
  watchUpdateLocationSagas,
  watchDeleteLocationSagas,
];

export default locationSagas;
