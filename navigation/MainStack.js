import React from "react";
import Tabs from "../components/Tabs";
import { createStackNavigator } from "@react-navigation/stack";
import CommentScreen from "../screens/CommentScreen";

const Stack = createStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={Tabs} />
            <Stack.Screen name="Comment" component={CommentScreen}/>
        </Stack.Navigator>
    );
}

export default MainStack;
