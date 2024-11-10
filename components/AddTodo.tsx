// 'use client';
// import { addTodo } from '@/lib/serverActions'; // Import the server-side function
// import { notifyUser } from '@/lib/notifyUser'; // Import the client-side function
// import { useState } from 'react';

// export default function AddTodo() {
//   const [todoName, setTodoName] = useState('');

//   const handleSubmit = async () => {
//     const formData = new FormData();
//     formData.append('name', todoName);
//     const newTodoName = await addTodo(formData);

//     // Trigger notification with the new Todo name
//     notifyUser(`Todo Added: ${newTodoName}`);
//     setTodoName(''); // Clear the input after adding the todo
//   };

//   return (
//     <div className="flex flex-col max-w-md mx-auto space-y-2">
//       <input
//         type="text"
//         value={todoName}
//         onChange={(e) => setTodoName(e.target.value)}
//         placeholder="Add a new todo"
//         className="border p-2 rounded w-full"
//         required
//       />
//       <button
//         onClick={handleSubmit}
//         className="bg-blue-500 text-white p-2 rounded-xl w-full"
//       >
//         Add Todo
//       </button>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { addTodo } from '@/lib/serverActions';
import NotificationHandler from '../lib/NotificationHandler';

export default function AddTodo() {
  const [todoName, setTodoName] = useState('');
  const [notification, setNotification] = useState({ title: '', message: '' });

  const handleAddTodo = async () => {
    if (!todoName.trim()) return; // Prevent adding empty todos

    // Add the todo item
    const formData = new FormData();
    formData.append('name', todoName);
    await addTodo(formData);

    // Set notification details
    setNotification({
      title: 'Todo Added',
      message: `You've added "${todoName}" to your list!`,
    });

    // Clear the input field
    setTodoName('');
  };

  return (
    <div className="flex flex-col max-w-md mx-auto space-y-2">
      <input
        type="text"
        value={todoName}
        onChange={(e) => setTodoName(e.target.value)}
        placeholder="Add a new todo"
        className="border p-2 rounded w-full"
      />
      <button
        onClick={handleAddTodo}
        className="bg-blue-500 text-white p-2 rounded-xl w-full"
      >
        Add Todo
      </button>

      <NotificationHandler {...notification} />
    </div>
  );
}
