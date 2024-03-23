import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomTabBar from "./components/BottomTopBar";
import Icon from "react-native-vector-icons/FontAwesome";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";


const Tab = createBottomTabNavigator();
function App() {
  return (
   
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props) => <BottomTabBar {...props} />}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Add") {
              iconName = "plus";
            } else if (route.name === "Profile") {
              iconName = "user";
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          style: {
            backgroundColor: "#fff",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          options={{
            headerTitle: "Ana Sayfa",
            headerStyle: {
              backgroundColor: "#f4511e",
              borderBottomWidth: 2,
         
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
          component={HomeScreen}
        />
        <Tab.Screen
          name="Add"
          options={{
            headerTitle: "Soru Ekle",
            headerStyle: {
              backgroundColor: "#f4511e",
              borderBottomWidth: 2,
              
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
          component={HomeScreen}
        />
        <Tab.Screen
          name="Profile"
          options={{
            headerTitle: "",
            headerStyle: {
              backgroundColor: "#f4511e",
              borderBottomWidth: 2,
            
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
          component={ProfileScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
