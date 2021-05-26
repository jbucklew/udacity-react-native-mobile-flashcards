import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

const NOTIFICATION_KEY = 'UdaciFlashcards:notifications';

// clear all scheduled notifications
export const clearLocalNotifications = async () => {
  try {
    await AsyncStorage.removeItem(NOTIFICATION_KEY);
    Notifications.cancelAllScheduledNotificationsAsync();

  } catch (e) {
    console.log(e);
  }
}

// set notification to appear tomorrow at 6 PM local time
export const setLocalNotification = async () => {
  // check if notification already set
  let data = await AsyncStorage.getItem(NOTIFICATION_KEY);
  data = JSON.parse(data);

  if (data === null) {
    // setting notification
    // check to make sure we have permission to send notifications
    const settings = await Notifications.getPermissionsAsync();
    if (settings.granted ||
      settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL) {

      // cancel any existing notifications
      await Notifications.cancelAllScheduledNotificationsAsync();

      // set notification to trigger tomorrow at 6 PM local time
      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(18);
      tomorrow.setMinutes(0);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Study Time!',
          body: 'Do not forget to take a quiz today!',
        },
        // DateTriggerInput
        trigger: tomorrow
      });

      // update storage that notification set
      await AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));

    } else {
      // request permission to send notifications
      await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
          allowAnnouncements: true,
        },
      });
    }
  }
}
