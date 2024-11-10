'use client';

import { useEffect } from 'react';

interface NotificationHandlerProps {
  title: string;
  message: string;
}

export default function NotificationHandler({
  title,
  message,
}: NotificationHandlerProps) {
  // Request notification permission when the component mounts
  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Trigger notification when title and message change
  useEffect(() => {
    if (title && message && Notification.permission === 'granted') {
      const iconPath = '/pic/notification.png';
      new Notification(title, {
        body: message,
        icon: iconPath,
      });
    }
  }, [title, message]);

  return null; // No UI needed for this component
}
