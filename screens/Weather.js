import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { getLocationAsync } from "../component/locationService";
import { PaperProvider } from "react-native-paper";
import axios from "axios";
import { weatherApiKey } from "../apiKeys";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { fetchWeatherAlerts } from "../component/Alarms";
import myUseContext from "../providers/UseProvider";
import Styles from "../component/Styles";
import Icon from "react-native-paper";

const myKey = process.env.EXPO_PUBLIC_API_KEY;

const Weather = () => {
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");
  const [alerts, setAlerts] = useState([]);

  const { setAlertValue } = myUseContext();

  useEffect(() => {
    const requestNotificationPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Notification permissions not granted");
      }
    };
    requestNotificationPermissions();

    const fetchWeatherData = async () => {
      try {
        const currentLocation = await getLocationAsync();
        setLocation(currentLocation);

        const response = await axios.get(
          `https://api.weatherbit.io/v2.0/current?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&key=${myKey}`
        );

        setWeatherData(response.data);
      } catch (error) {
        console.error("Error getting current location:", error);
      }
    };

    fetchWeatherData();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.weatherbit.io/v2.0/current?city=${encodeURIComponent(
          searchLocation
        )}&key=${myKey}`
      );

      setWeatherData(response.data);
      setSearchLocation("");
      setAlertValue();

      const fetchedAlerts = await fetchWeatherAlerts(
        response.data.data[0].lat,
        response.data.data[0].lon
      );
      setAlerts(fetchedAlerts);
      setAlertValue(fetchedAlerts);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const startGPSTracking = async () => {
    try {
      let currentLocation;
      if (searchLocation) {
        currentLocation = await getLocationAsync();
      } else {
        currentLocation = location;
      }

      setLocation(currentLocation);

      const response = await axios.get(
        `https://api.weatherbit.io/v2.0/current?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&key=${myKey}`
      );

      setWeatherData(response.data);
      // Fetch alerts for the current location
      const fetchedAlerts = await fetchWeatherAlerts(
        currentLocation.latitude,
        currentLocation.longitude
      );
      setAlerts(fetchedAlerts);
    } catch (error) {
      console.error("Error getting current location:", error);
    }
  };

  if (!location || !weatherData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={Styles.weather}>
      <View style={{ top: -25, width: 150 }}>
        <TextInput
          placeholder="Enter city name"
          value={searchLocation}
          onChangeText={(text) => setSearchLocation(text)}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
      <Text>Weather</Text>
      <Text>
        Location: {weatherData.data[0].city_name} {weatherData.data[0].temp}°C
      </Text>
      <Image
        style={{ width: 50, height: 50 }}
        source={{
          uri: `https://www.weatherbit.io/static/img/icons/${weatherData.data[0].weather.icon}.png`,
        }}
      />
      <Text>Description: {weatherData.data[0].weather.description}</Text>
      <Text>Wind Speed: {weatherData.data[0].wind_spd.toFixed(1)}m/s</Text>
      {/* Add more weather information as needed */}
    </View>
  );
};

export default Weather;
