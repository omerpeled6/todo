// src/components/NotificationToggle.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { notifyUser } from '@/lib/notifyUser'; // Import the client-side function

export default function NotificationToggle() {
  const [notificationsEnabled, setNotificationsEnabled] =
    useState<boolean>(false);

  // Check notification permission on mount and set the button state
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setNotificationsEnabled(Notification.permission === 'granted');
    }
  }, []);

  // Handle enabling notifications
  const handleEnableNotifications = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      setNotificationsEnabled(true);
      notifyUser('Notifications enabled!'); // Use the imported function
    }
  };

  return (
    <div className="mt-10 p-2 bg-white rounded-lg shadow-lg">
      <button
        onClick={handleEnableNotifications}
        disabled={notificationsEnabled}
        className={`w-full px-4 text-white ${
          notificationsEnabled ? 'bg-green-500' : 'bg-red-500'
        }`}
      >
        {notificationsEnabled
          ? 'Notifications Enabled'
          : 'Enable Notifications'}
      </button>
    </div>
  );
}
