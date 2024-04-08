import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Tabs from "./components/Tabs";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

const Stack = createStackNavigator();
const isLoggedIn = true;

function App() {
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tabs />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen}  />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
