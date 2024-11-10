import React, { useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleAddTodo = () => {
    setRefresh(!refresh); 
  };

  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm onAdd={handleAddTodo} />
      <TodoList key={refresh} />
    </div>
  );
};

export default App;
