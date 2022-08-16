import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider, createStore, combineReducers } from './minidux';

const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'increase':
      return { ...state, count: state.count + 1 };
    case 'decrease':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

const todoReducer = (state = { todos: [], idRef: 0 }, action) => {
  switch (action.type) {
    case 'add_todo':
      const id_ = state.idRef;
      return {
        ...state,
        todos: [...state.todos, { id: state.idRef, text: action.payload }],
        idRef: state.idRef + 1,
      };
    case 'delete_todo':
      const filteredTodos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      return { ...state, todos: filteredTodos };
    default:
      return state;
  }
};

const reducer = combineReducers({
  todos: todoReducer,
  count: countReducer,
});

const store = createStore(reducer);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
