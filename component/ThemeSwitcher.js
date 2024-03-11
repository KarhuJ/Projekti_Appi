import React, { useState } from 'react';
import { View, Button,  } from 'react-native';

const ThemeSwitcher = ({ toggleTheme }) => {
  const [isLightTheme, setIsLightTheme] = useState(true);

  const handleThemeToggle = () => {
    setIsLightTheme((prevIsLightTheme) => !prevIsLightTheme);
    toggleTheme(!isLightTheme);
  };

  return (
    <View style={{ marginTop: 20 }}>
      <Button title={isLightTheme ? <Text>Switch to Dark Theme</Text> : <Text>Switch to Light Theme</Text>} onPress={handleThemeToggle} />

    </View>
  );
};

export default ThemeSwitcher;
