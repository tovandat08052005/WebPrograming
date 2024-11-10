import React from 'react';

const TodoItem = ({ todo, onDelete, onToggleComplete }) => {
  return (
    <div>
      <h4>{todo.title}</h4>
      <p>{todo.description}</p>
      <span>Due: {todo.due_date}</span>
      <input
        type="radio"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id, todo.completed)}
      />
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
};

export default TodoItem;
