import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AddScreen from "../screens/AddScren";

const Tab = createBottomTabNavigator();



const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: "#ffffff",
          borderRadius: 15,
          borderColor : 'black',
          borderWidth : 3,
          height: 90,
          ...style.shadow,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Icon
                name="home"
                size={25}
                color={focused ? "#000000" : "#000333"}
                style={{ width: 25, height: 25 }}
              />
              <Text style={{ color: focused ? "#000000" : "#000333" }}>
                Anasayfa
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Icon
                name="plus"
                size={25}
                color={focused ? "#000000" : "#000333"}
                style={{ width: 25, height: 25 }}
              />
              <Text style={{ color: focused ? "#000000" : "#000333" }}>
                Ekle
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Icon
                name="gear"
                size={25}
                color={focused ? "#000000" : "#000333"}
                style={{ width: 25, height: 25 }}
              />
              <Text style={{ color: focused ? "#000000" : "#000333" }}>
                Anasayfa
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;
