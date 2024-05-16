import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import AddScreen from "../screens/AddScren";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Colors } from "../utils/Colors";


const Tab = createBottomTabNavigator();

const CustomHeader = ({ title }) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>{title}</Text>
  </View>
);

const Tabs = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "#ccc",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
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
            header: () => <CustomHeader title="YKS Dostum" />
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
            header: () => <CustomHeader title="YKS Dostum" />
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
            header: () => <CustomHeader title="YKS Dostum" />
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0"
  },
  header: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:20,
    backgroundColor: Colors.mainColor,
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  tabBar: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    borderRadius: 16,
    elevation: 8,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "black",
  },
});

export default Tabs;