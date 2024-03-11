import {} from "../component/Alarms";
import React from "react";
import { View, Text } from "react-native";
import myUseContext from "../providers/UseProvider";

export default function AlertScreen() {
  const { alert } = myUseContext();

  return (
    <View>
      <Text>Alert Screen</Text>
      {alert.map((a, i) => (
        <View key={i}>
          {Object.keys(a).map((key, i) => (
            <Text key={i}>
              {key}: {a[key]}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}
