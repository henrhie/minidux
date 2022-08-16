import { useContext } from 'react';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector';
import { miniduxContext } from './context';

export const useStore = () => {
  const store = useContext(miniduxContext);
  if (!store) {
    throw new Error('store was not provided to provider');
  }
  return store;
};

export const useDispatch = () => {
  const store = useStore()
  return store.dispatch;
};

export const useSelector = (selector) => {
  const store = useStore();

  return useSyncExternalStoreWithSelector(
    store.subscribe,
    store.getState,
    store.getState,
    selector
  );
};
