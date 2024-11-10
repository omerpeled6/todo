// src/lib/serverActions.ts
'use server';

// Prisma imports and other server functions...
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Your other server functions...
export const addTodo = async (formData: FormData) => {
  const name = formData.get('name') as string;
  const newTodo = await prisma.todo.create({
    data: { name, completed: false },
  });
  revalidatePath('/');
  return newTodo.name;
};

export const updateTodoName = async (formData: FormData) => {
  const id = Number(formData.get('id'));
  const name = formData.get('name') as string;
  await prisma.todo.update({ where: { id }, data: { name } });
};

export const toggleTodoStatus = async (id: number, completed: boolean) => {
  await prisma.todo.update({ where: { id }, data: { completed } });
};

export const deleteTodo = async (id: number) => {
  await prisma.todo.delete({ where: { id } });
};
