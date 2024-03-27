import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Tabs from "./components/Tabs";
import { View } from "react-native";
import LoginScreen from "./screens/LoginScreen";

const Tab = createBottomTabNavigator();
const isLoggedIn=false;


function App() {
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tabs />
      ) : (
        <View style={{ flex: 1 }}>
          <LoginScreen />
        </View>
      )}
    </NavigationContainer>
  );
}

export default App;
