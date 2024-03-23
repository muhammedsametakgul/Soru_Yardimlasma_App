import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Tabs from "./components/Tabs";
import { _View } from "react-native";

const Tab = createBottomTabNavigator();
function App() {
  return (
    <NavigationContainer>
      <Tabs/>
    </NavigationContainer>
  );
}

export default App;
