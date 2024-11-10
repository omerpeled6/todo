// src/app/api/todos/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Fetch all todos, sorted by id
export async function GET() {
  const todos = await prisma.todo.findMany({
    orderBy: {
      id: 'asc',
    },
  });
  return NextResponse.json(todos);
}

// Add a new todo
export async function POST(request: Request) {
  const { name } = await request.json();
  const newTodo = await prisma.todo.create({
    data: { name, completed: false },
  });
  return NextResponse.json(newTodo);
}

// Update an existing todo (name and completed status)
export async function PUT(request: Request) {
  const { id, name, completed } = await request.json(); // Include 'completed' in the request body
  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { name, completed }, // Update both fields
  });
  return NextResponse.json(updatedTodo);
}

// Delete a todo
export async function DELETE(request: Request) {
  const { id } = await request.json();
  await prisma.todo.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
