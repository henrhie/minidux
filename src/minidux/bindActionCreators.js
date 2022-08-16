export const bindActionCreator = (dispatch, actionCreator) => {
  if (typeof actionCreator !== 'function') {
    throw new Error('action creator must be of type function');
  }
  return (...args) => {
    dispatch(actionCreator.apply(this, args));
  };
};

export const bindActionCreators = (dispatch, actionCreators) => {
  if (typeof actionCreators !== 'object') {
    throw new Error('action creators must be of type object');
  }
  const boundActionCreators = {};
  const actionCreatorKeys = Object.keys(actionCreators);
  for (let i = 0; i < actionCreatorKeys.length; i++) {
    const key = actionCreatorKeys[i];
    boundActionCreators[key] = bindActionCreator(dispatch, actionCreators[key]);
  }
  return boundActionCreators;
};
