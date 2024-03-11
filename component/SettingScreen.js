import React from "react";
import { View, Text } from "react-native";
import Weather from "../screens/Weather"
import AlertScreen from "../screens/AlertScreen";

export default function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Weather />
        <AlertScreen />
    </View>
  );
}
