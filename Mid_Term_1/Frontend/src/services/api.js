import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', 
});

export const getTodos = () => api.get('/todos');
export const createTodo = (data) => api.post('/todos', data);
export const updateTodo = (id, data) => api.put(`/todos/${id}`, data);
export const deleteTodo = (id) => api.delete(`/todos/${id}`);

