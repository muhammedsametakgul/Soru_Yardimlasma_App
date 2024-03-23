import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const BottomTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          let icon;

          if (route.name === 'Home') {
            icon = 'home';
          } else if (route.name === 'Profile') {
            icon = 'user';
          }

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={styles.tabItem}
            >
              <View style={styles.tabItemInner}>
                <Icon name={icon} size={30} color={isFocused ? '#000000' : '#999'} />
                {isFocused && <Text style={styles.tabItemText}>{options.title}</Text>}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Add')}>
        <Icon name="plus" size={40} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    paddingBottom: 10
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 0.5,
    borderColor: '#ccc',
    height: 60,
    alignItems: 'center',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabItemInner: {
    alignItems: 'center',
    marginBottom: 4,
  },
  tabItemText: {
    color: '#6C63FF',
    fontSize: 12,
  },
  addButton: {
    position: 'absolute',
    bottom: 20, 
    width: 50,
    height: 50,
    borderRadius: 25, 
    backgroundColor: '#00C8FF',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 5,
  },
});

export default BottomTabBar;
