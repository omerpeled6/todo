//Function to trigger notifications on the client side
export async function notifyUser(notificationText: string) {
  if (typeof window !== 'undefined' && 'Notification' in window) {
    if (Notification.permission === 'granted') {
      new Notification(notificationText);
    } else if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        new Notification(notificationText);
      }
    }
  } else {
    alert('Browser does not support notifications');
  }
}
