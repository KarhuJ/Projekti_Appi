import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Appbar, Menu, Provider as PaperProvider } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppContextProvider } from "./providers/ContextProvider";
import Weather from "./screens/Weather";
import AlertScreen from "./screens/AlertScreen";
import Styles from "./component/Styles";
import { TouchableOpacity, Button } from "react-native";

const Stack = createStackNavigator();



export default function App() {
  const [visible, setVisible] = React.useState(false);
  
 

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);


  return (
    <GestureHandlerRootView style={Styles.container}>
      <SafeAreaProvider>
        <PaperProvider>
          <AppContextProvider>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="WeatherApp"
                  component={Weather}
                  options={({ navigation }) => ({
                    // Pass navigation prop here
                    header: () => (
                      <Appbar.Header>
                        <Appbar.Content title="Weather App" />
                        <Menu
                          visible={visible}
                          onDismiss={closeMenu}
                          anchor={
                            <Appbar.Action
                              icon="dots-vertical"
                              onPress={openMenu}
                            />
                          }
                        >
                          <Menu.Item
                            onPress={() => navigation.navigate("Weather")} // Use navigation prop here
                            title="Weather"
                          />
                          <Menu.Item
                            onPress={() => navigation.navigate("Alerts")} // Use navigation prop here
                            title="Alerts"
                          />
                        </Menu>
                      </Appbar.Header>
                    ),
                  })}
                />
                <Stack.Screen name="Weather" component={Weather} />
                <Stack.Screen name="Alerts" component={AlertScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </AppContextProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
