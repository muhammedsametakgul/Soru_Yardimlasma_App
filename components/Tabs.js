import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AddScreen from "../screens/AddScren";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          bottom:16 , 
          left: 16,
          right: 16,
          borderRadius: 16, 
          elevation: 8, 
          backgroundColor: "#f0f0f0", 
          borderWidth: 1, 
          borderColor: "black", 
        },
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#ccc",
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
        contentContainerStyle: {
          paddingTop: 50, 
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={24} color={color} />
          ),
          tabBarLabel: "Anasayfa",
        }}
      />

      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus" size={24} color={color} />
          ),
          tabBarLabel: "Ekle", 
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={24} color={color} />
          ),
          tabBarLabel: "Ayarlar",
        }}
      />
    </Tab.Navigator>
  );
};


export default Tabs;
