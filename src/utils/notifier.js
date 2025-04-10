class Notifier {
  constructor() {
    setInterval(() => {
      this.sendNotifications();
    }, 1000);
  }
  sendNotifications = () => {
    this.notificationsToSend = this.notificationsToSend.reduce(
      (notificationsPending, notification) => {
        if (notification.time < Date.now()) {
          if (Notification.permission === "granted") {
            new Notification(notification.title, {
              body: notification.body,
            });
          } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
              if (permission === "granted") {
                scheduleMedicationReminder(medication);
              }
            });
          }
        } else {
          notificationsPending.push(notification);
        }
        return notificationsPending;
      },
      []
    );
  };
  notificationsToSend = [];
  addNotification = (notification) => {
    if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          this.notificationsToSend.push(notification);
        }
      });
    }
  };
}

export const notifier = new Notifier();
