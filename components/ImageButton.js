import React from 'react';
import { TouchableOpacity, Image, View, StyleSheet, Text } from 'react-native';

const ImageButton = ({ onPress, imageSource, text }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'cover', 
  },
  text: {
    marginTop: 8,
    fontSize: 16,
    color: 'black',
  },
});

export default ImageButton;
