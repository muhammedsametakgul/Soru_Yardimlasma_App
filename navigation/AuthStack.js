import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import PasswordResetScreen from "../screens/PasswordResetScreen";

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator 
            initialRouteName="Login"
            screenOptions={{headerShown:false}}>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Signup" component={SignupScreen}/>
            <Stack.Screen name="Reset" component={PasswordResetScreen}/>

        </Stack.Navigator>
    );
}
export default AuthStack;

