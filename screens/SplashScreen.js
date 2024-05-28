import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const animation = require("../assets/animations/animation.json");

function SplashScreen({ navigation }) {
  
  return (
    <View style={styles.container}>
      <LottieView
        source={animation}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  animation: {
    width: width * 0.8,
    height: height * 0.8,
  },
});

export default SplashScreen;
