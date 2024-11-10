// src/app/page.tsx
import prisma from '@/lib/prisma';
import AddTodo from '@/components/AddTodo';
import TodoList from '@/components/TodoList';
import GoogleTranslate from '../components/GoogleTranslate';
// import Notification from '@/components/Notifications';

export default async function Home() {
  // Fetch all todos from the database
  const todos = await prisma.todo.findMany();

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-100 h">
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <AddTodo />
      <TodoList todos={todos} />
      <GoogleTranslate />
      {/* <Notification /> */}
    </main>
  );
}
