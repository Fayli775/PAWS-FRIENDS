'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
// You can import your root reducer and initial state here if needed
// import { initializeState } from './rootSlice';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    // Optional: Initialize store state if needed
    // storeRef.current.dispatch(initializeState({ /* initial data */ }));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
} 