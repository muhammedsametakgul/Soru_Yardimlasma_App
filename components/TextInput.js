import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const MultilineTextInput = () => {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        multiline={true}
        onChangeText={setText}
        value={text}
        placeholder="Sorunuzu giriniz"
        placeholderTextColor="gray"
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      padding: 10,
      backgroundColor: '#fff',
      width: '98%' ,
      
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 15,
      padding: 10,
      fontSize: 16,
      minHeight: 250,
      textAlign: 'left' ,
      textAlignVertical: "top"
    },
});

  

export default MultilineTextInput;
