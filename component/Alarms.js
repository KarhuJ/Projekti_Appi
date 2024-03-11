import axios from "axios";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { weatherApiKey } from "../apiKeys";
import { useNavigation } from '@react-navigation/native';

const myKey = process.env.EXPO_PUBLIC_API_KEY;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const registerForPushNotificationsAsync = async () => {
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      console.log("Failed to get push token for push notification!");
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Expo Push Token:", token);
  } else {
    console.log("Must use physical device for Push Notifications");
  }
};

const fetchWeatherAlerts = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://api.weatherbit.io/v2.0/alerts?lat=${latitude}&lon=${longitude}&key=${myKey}`
    );

    console.log("Weather alerts:", response.data);

    if (
      response.data &&
      response.data.alerts &&
      response.data.alerts.length > 0
    ) {
      response.data.alerts.forEach((alert) => {
        SendNotification(alert.title, alert.description);

      });
      return response.data.alerts;
    } else {
      console.warn("No weather alerts found.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching weather alerts:", error);
    return [];
  }
};

const SendNotification = async (title, message) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body: message,
      },
      trigger: null,
      onPress: () => navigation.navigate('Alerts'),
    });

     console.log("Notification sent:", title, message);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};

export {
  fetchWeatherAlerts,
  SendNotification,
  registerForPushNotificationsAsync,
};
