// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabBar from './components/BottomTopBar'; 
import Icon from 'react-native-vector-icons/FontAwesome'; 
import HomeScreen from './screens/HomeScreen';

const Tab = createBottomTabNavigator();





function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={props => <BottomTabBar {...props} />}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Add') {
              iconName = 'plus';
            } else if (route.name === 'Profile') {
              iconName = 'user';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Add" component={HomeScreen} />
        <Tab.Screen name="Profile" component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;