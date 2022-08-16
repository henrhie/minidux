import React from 'react';
import { miniduxContext } from './context';

export const Provider = ({ store, children }) => {
  return (
    <miniduxContext.Provider value={store}>{children}</miniduxContext.Provider>
  );
};
