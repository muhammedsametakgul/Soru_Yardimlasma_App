import React from "react";
import Tabs from "../components/Tabs";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={Tabs} />
        </Stack.Navigator>
    );
}

export default MainStack;
