import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Colors } from "../utils/Colors";
import AddScreen from "../screens/AddScren";

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
          tabBarActiveTintColor: Colors.mainColor,
          tabBarInactiveTintColor: "#8e8e93",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home-outline" size={28} color={color} />
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
              <MaterialCommunityIcons name="plus-circle-outline" size={28} color={color} />
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
              <MaterialCommunityIcons name="account-circle-outline" size={28} color={color} />
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
    backgroundColor: "#ffffff"
  },
  header: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: Colors.mainColor,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd'
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  tabBar: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    borderRadius: 16,
    elevation: 8,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6.00,
    borderTopWidth: 0,
    height: 50,
  },
});

export default Tabs;
