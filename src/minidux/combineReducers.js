export const combineReducers = (reducers) => {
  if (typeof reducers !== 'object') {
    throw new Error('reducer must be of type object');
  }

  const stateKeys = Object.keys(reducers);

  return function combinedReducers(state = {}, action) {
    const nextState = {};
    let hasChanged = false;
    for (let i = 0; i < stateKeys.length; i++) {
      let nextKey = stateKeys[i];
      let previousState = state[nextKey];
      let nextState_ = reducers[nextKey](previousState, action);
      nextState[nextKey] = nextState_;
      hasChanged = hasChanged || previousState !== nextState;
    }
    return hasChanged ? nextState : state;
  };
};
