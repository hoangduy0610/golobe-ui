// src/redux/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from '@/redux/reducers/userReducers';
import locationReducer from '@/redux/reducers/locationReducer';
import rootSagas from './sagas/rootSagas';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'location'],
};

const rootReducer = combineReducers({
  user: userReducer,
  location: locationReducer,
});

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSagas);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
