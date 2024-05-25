import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/tasks'
});

export const getTasks = () => api.get('/');
export const getTask = (id) => api.get(`/${id}`);
export const createTask = (task) => api.post('/', task);
export const updateTask = (id, task) => api.put(`/${id}`, task);
export const deleteTask = (id) => api.delete(`/${id}`);
