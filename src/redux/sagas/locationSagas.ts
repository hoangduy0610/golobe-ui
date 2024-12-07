import { call, put, takeLatest } from 'redux-saga/effects';
import { locationActionNames } from '../actions/locationActions'; // Import các action đã sửa

import { locationApis } from '@/redux/apis/locationApis'; // Import locationApis
import { fetchLocationsFailure, fetchLocationsSuccess } from '../reducers/locationReducer';

// Lấy danh sách locations
function* fetchLocationsSaga(): Generator<any, void, any> {
  try {
    const response = yield call(locationApis.getList);
    yield put(fetchLocationsSuccess(response.data));
  } catch (error: any) {
    console.log(error)
    yield put(fetchLocationsFailure(error.message));
  }
}



// Lắng nghe các action và chạy các saga
export function* watchFetchLocationSagas() {
  yield takeLatest(locationActionNames.FETCH_LOCATION, fetchLocationsSaga);
}

// export function* watchCreateLocationSagas() {
//   yield takeLatest(CREATE_LOCATION_REQUEST, createLocationSaga);
// }

// export function* watchUpdateLocationSagas() {
//   yield takeLatest(UPDATE_LOCATION_REQUEST, updateLocationSaga);
// }

// export function* watchDeleteLocationSagas() {
//   yield takeLatest(DELETE_LOCATION_REQUEST, deleteLocationSaga);
// }

const locationSagas = [
  watchFetchLocationSagas,
  // watchCreateLocationSagas,
  // watchUpdateLocationSagas,
  // watchDeleteLocationSagas,
];

export default locationSagas;



