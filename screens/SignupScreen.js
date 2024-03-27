import React, { useState } from 'react';
import { Alert, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { Colors } from '../utils/Colors';
import { useNavigation } from "@react-navigation/native";

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleSignup = () => {
 
  };    

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/images/YKS.png')} style={styles.image} />
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          autoCorrect={false}
          autoCapitalize='none'
        />
        <TextInput
          style={styles.input}
          placeholder='Şifre'
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize='none'
        />
        <TextInput
          style={styles.input}
          placeholder='Şifreyi Onayla'
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          autoCorrect={false}
          autoCapitalize='none'
        />
      </View>

      <Pressable style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Kaydol</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Login")}>
      <Text style={styles.footerText}>Hesabın zaten var mı?<Text style={styles.login}> Giriş Yap</Text></Text>

      </Pressable>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image: {
    height: 250,
    width: 250,
    marginBottom: '10%',
  },
  inputView: {
    width: "100%",
    paddingHorizontal: 40,
    marginBottom: 20
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 15
  },
  button: {
    backgroundColor: "red",
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
    marginBottom: 20
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },
  footerText: {
    textAlign: "center",
    color: "gray",
  },
  login: {
    color: "red",
    fontSize: 13
  }
});

export default SignupScreen;
