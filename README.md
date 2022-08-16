
# Minidux - Redux from scratch

Built in a attempt to understand global state management packages for React.

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/react-ljxzp2)

!!! Minidux uses the use-sync-external-store package to sync the store with your React Application and prevent tearing during concurrent rendering.


## API Reference

#### createStore


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `reducers` | `{ [state: any]: Function }` | creates a single minidux store |


#### combineReducers


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `reducers` | `{ [state: any]: Function }` | combines several reducer functions into a single reducer function |


#### BindActionCreator


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `actionCreator && dispatch` | `ActionCreator: Function && dispatch: Function` | binds a single action creator to the minidux store |

#### BindActionCreators


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `actionCreators && dispatch` | `ActionCreators: { [key: any]: Function } && dispatch: Function` | binds several action creators to the minidux store |

#### hooks


| Hook | Usage     | Description                |
| :-------- | :------- | :------------------------- |
| `useStore` | `const store = useStore()` | return the minidux store |
| `useDispatch` | `const dispatch = useDispatch()` | return the dispatch function used to mutate store |
| `useSelector` | `const state = useSelector(selectorFn)` | extract state based on selector function |






## Example

```javascript
//App.js

import * as React from 'react';
import { useSelector, bindActionCreators, useDispatch } from './minidux';
import { useState } from 'react';

const TodoList = ({ todos, deleteTodo }) => {
  return todos.map((todo) => {
    return (
      <li style={{ margin: 0 }} onClick={() => deleteTodo(todo.id)}>
        {todo.text}
      </li>
    );
  });
};

export default function App() {
  const [inputText, setInputText] = useState('');

  /*to extract state from store*/
  const {
    count: { count },
    todos: { todos },
  } = useSelector(({ count, todos }) => ({ count, todos }));

  /*return dispatch function*/
  const dispatch = useDispatch();

  /*binds several action creators to minidux store*/
  const { increase, decrease, deleteTodo, addTodo } = bindActionCreators(
    dispatch,
    {
      increase: () => ({ type: 'increase' }),
      decrease: () => ({ type: 'decrease' }),
      deleteTodo: (id) => ({ type: 'delete_todo', payload: id }),
      addTodo: (text) => ({ type: 'add_todo', payload: text }),
    }
  );

  return (
    <main>
      <button onClick={increase}>increase</button>
      <button onClick={decrease}>decrease</button>
      <h1>{count}</h1>
      <input
        onChange={(e) => {
          setInputText(e.target.value);
        }}
      />
      <button
        onClick={() => {
          addTodo(inputText);
        }}
      >
        add todo
      </button>
      <TodoList todos={todos} deleteTodo={deleteTodo} />
    </main>
  );
}



//index.js

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

/*combines several reducers into a single reducer function*/
const reducer = combineReducers({
  todos: todoReducer,
  count: countReducer,
});

/* create minidux store. */
/* Note that just like redux, you can have only one store in your application */
const store = createStore(reducer);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

