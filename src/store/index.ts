import {configureStore} from '@reduxjs/toolkit';
import {appReducer} from './slices/app/app.slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';

import Reactotron from '../../ReactotronConfig';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['app'],
};

const rootReducer = combineReducers({
  app: appReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const enhancers =
  Reactotron.createEnhancer !== undefined ? [Reactotron.createEnhancer()] : [];

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
  enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(...enhancers),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
