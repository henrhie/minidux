import { useContext, useState, useEffect } from 'react';
import { miniduxContext } from './context';

export const useStore = () => {
  const store = useContext(miniduxContext);
  if (!store) {
    throw new Error('store was not provided to provider');
  }
  return store;
};

export const useDispatch = () => {
  const store = useStore();
  return store.dispatch;
};

export const useSelector = (selector) => {
  const store = useStore();
  const [state, setState] = useState(selector(store.getState()));

  useEffect(() => {
    const unsubscribe = store.subscribe((state) => setState(selector(state)));
    return () => unsubscribe();
  }, []);

  return state;
};
