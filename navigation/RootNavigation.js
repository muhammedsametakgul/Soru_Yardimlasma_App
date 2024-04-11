import { createStackNavigator } from "@react-navigation/stack";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./MainStack";
import AuthStack from "./AuthStack";

const Stack = createStackNavigator();


const RootNavigation = () => {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        if (initializing) setInitializing(false);
      });
  
      return unsubscribe;
    }, []);
  
    if (initializing) return null;
  
    return (
        <NavigationContainer>
         {user ? <MainStack /> : <AuthStack />} 

        </NavigationContainer>
    );
};

export default RootNavigation;
