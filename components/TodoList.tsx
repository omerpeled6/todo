// src/components/TodoList.tsx
'use client';

import { useState } from 'react';
import {
  deleteTodo,
  toggleTodoStatus,
  updateTodoName,
} from '@/lib/serverActions';

type Todo = {
  id: number;
  name: string;
  completed: boolean;
};

interface TodoListProps {
  todos: Todo[];
}

export default function TodoList({ todos: initialTodos }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [newName, setNewName] = useState('');

  // Start editing a todo
  const startEditing = (todo: Todo) => {
    setEditingTodo(todo);
    setNewName(todo.name);
  };

  // Update the name of a todo
  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (editingTodo) {
      const formData = new FormData();
      formData.append('id', editingTodo.id.toString());
      formData.append('name', newName);

      await updateTodoName(formData);
      setTodos(
        todos.map((todo) =>
          todo.id === editingTodo.id ? { ...todo, name: newName } : todo
        )
      );
      setEditingTodo(null);
      setNewName('');
    }
  };

  // Toggle the completion status of a todo
  const handleToggleStatus = async (id: number, completed: boolean) => {
    await toggleTodoStatus(id, completed);
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
    );
  };

  // Delete a todo
  const handleDelete = async (id: number) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <ul className="mt-4 space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex justify-between items-center p-2 border-b"
        >
          {editingTodo?.id === todo.id ? (
            <form
              onSubmit={handleUpdate}
              className="flex items-center space-x-2"
            >
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <button type="submit" className="text-green-500">
                Save
              </button>
            </form>
          ) : (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleToggleStatus(todo.id, !todo.completed)}
                className={todo.completed ? 'line-through' : ''}
              >
                {todo.name}
              </button>
              <span
                className={`${
                  todo.completed ? 'text-green-600' : 'text-gray-600'
                } text-sm`}
              >
                {todo.completed ? 'Completed' : 'Incomplete'}
              </span>
              <button
                className="text-yellow-500"
                onClick={() => startEditing(todo)}
              >
                Edit
              </button>
              <button
                className="text-red-500"
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
