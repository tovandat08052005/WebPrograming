import React, { useEffect, useState } from 'react';
import { getTodos, deleteTodo, updateTodo } from '../services/api';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await getTodos();
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      await updateTodo(id, { completed: !completed });
      setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !completed } : todo));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div>
      <h2>Todo List</h2>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={handleDelete}
          onToggleComplete={handleToggleComplete}
        />
      ))}
    </div>
  );
};

export default TodoList;
