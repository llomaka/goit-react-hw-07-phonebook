import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contactsSlice from './contactsSlice';
import filterSlice from './filterSlice';

const persistConfig = {
  key: 'filter',
  storage,
}

const persistedReducer = persistReducer(persistConfig, filterSlice);

export const store = configureStore({
  reducer: {
    contacts: contactsSlice,
    filter: persistedReducer,
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
