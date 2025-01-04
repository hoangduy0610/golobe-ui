// src/redux/sagas/rootSagas.ts
import { all, fork } from 'redux-saga/effects';
import  locationSagas  from './locationSagas';
import userSagas from './userSagas';

function* rootSagas(): Generator {
  
  yield all([
     ...locationSagas.map(saga => fork(saga)),
     ...userSagas.map(saga => fork(saga))
    ]);
}

export default rootSagas;
