import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:4000';

export interface Todo {
  _id: number;
  title: string;
  completed: boolean;
}

// Get all todos
export const getTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(`${API_BASE_URL}/todo/list`);
  return response.data;
};

// Create a new todos
export const createTodo = async (title: string): Promise<Todo> => {
  const response = await axios.post(`${API_BASE_URL}/todo/create`, {
    title,
    completed: false,
  });
  return response.data;
};

// Update a todos
export const updateTodo = async (
  id: number,
  updatedData: Partial<Pick<Todo, 'title' | 'completed'>>
): Promise<Todo> => {
  const response = await axios.put(`${API_BASE_URL}/todo/update/${id}`, updatedData);
  return response.data;
};

// Delete a todos
export const deleteTodo = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/todo/delete/${id}`);
};

// Reusable register (or any POST) API function
export const registerApi = async <T, D = unknown>(data: D): Promise<T> => {
  const response: AxiosResponse<T> = await axios.post(`${API_BASE_URL}/register`, data);
  return response.data;
};
