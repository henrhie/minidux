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
  const {
    count: { count },
    todos: { todos },
  } = useSelector(({ count, todos }) => ({ count, todos }));

  const dispatch = useDispatch();
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
