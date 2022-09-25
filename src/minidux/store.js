function createStore(reducer, initialState) {
  let currentState = initialState;
  let currentReducer = reducer;
  let listeners = [];
  let dispatching = false;

  function getState() {
    if (dispatching) {
      throw new Error('currently dispatching');
    }
    return currentState;
  }

  function dispatch(action) {
    if (dispatching) {
      throw new Error('currently dispatching');
    }
    dispatching = true;
    if (typeof action !== 'object') {
      throw new Error('action must be of type object');
    }
    if (action.type === undefined) {
      throw new Error('action must define type');
    }

    currentState = currentReducer(currentState, action);
    dispatching = false;
    listeners.forEach((listener) => listener(currentState));
    return action;
  }

  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('listener must be of type function');
    }
    listeners.push(listener);
    let subscribed = true;
    return () => {
      if (!subscribed) {
        return;
      }
      const idx = listeners.indexOf(listener);
      listeners.slice(idx, 1);
      subscribed = false;
    };
  }

  dispatch({ type: 'no_one_should_use_this_action_type' });

  return {
    getState,
    dispatch,
    subscribe,
  };
}

export { createStore };
