"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { createTodo, deleteTodo, getTodos, updateTodo } from "lib/api";

interface Todo {
  _id: number;
  title: string;
}

export default function TodoForm() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    try {
      const res = await getTodos();
      setTodos(res);
    } catch (err) {
      console.error("Failed to fetch todos:", err);
      toast.error('Error fetching todos: ' + (err as Error).message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddOrUpdate = async () => {
    if (!input.trim()) return;
    try {
      setLoading(true);
      if (editId !== null) {
        console.log('id', editId)
        await updateTodo(editId, { title: input });
        setEditId(null);
        toast.success('Todo updated successfully!');
      } else {
        await createTodo(input);
        toast.success('Todo added successfully!');
      }
      setInput("");
      fetchTodos();
    } catch (err) {
      console.error("Error saving todo:", err);
      toast.error('Error saving todo: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      fetchTodos();
      toast.success('Todo deleted successfully!');
    } catch (err) {
      console.error("Error deleting todo:", err);
      toast.success('Error deleting todo:' + (err as Error).message);
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditId(todo._id);
    setInput(todo.title);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Todo App
      </h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What do you want to do?"
          className="flex-1 px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddOrUpdate}
          disabled={loading}
          className={`px-4 py-2 rounded text-white cursor-pointer ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <ul className="space-y-3">
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex justify-between items-center bg-white border rounded px-4 py-3 shadow-sm"
          >
            <span className="text-gray-800">{todo.title}</span>
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(todo)}
                className="text-blue-500 hover:underline text-sm cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(todo._id)}
                className="text-red-500 hover:underline text-sm cursor-pointer"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
