import { configureStore } from '@reduxjs/toolkit';
// We will create this reducer soon
// import rootReducer from './rootSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      dummy: (state = {}) => state,
    },
     // Add reducers here later, e.g.:
    // root: rootReducer,
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch']; 