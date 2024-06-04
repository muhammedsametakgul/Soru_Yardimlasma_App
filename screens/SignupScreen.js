import React, { useState } from 'react';
import { Alert, Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from '../utils/Colors';
import { useNavigation } from "@react-navigation/native";
import { signUpWithEmailAndPassword } from '../service/SignupUser';

const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleSignup = async () => {
    try {
      if (password !== confirmPassword) {
        throw new Error("Parolalar eşleşmiyor.");
      }
      signUpWithEmailAndPassword(email, password, username)
        .then((user) => {
          console.log("Kullanıcı başarıyla oluşturuldu:", user);
        })
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/images/YKS.png')} style={styles.image} />
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder='Kullanıcı Adı'
          value={username}
          onChangeText={setUsername}
          autoCorrect={false}
          autoCapitalize='none'
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          autoCorrect={false}
          autoCapitalize='none'
          keyboardType="email-address"
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
    backgroundColor: '#f0f4f8',
    padding: 20,
  },
  image: {
    height: 150,
    width: 150,
    marginBottom: 30,
    borderRadius: 75,
  },
  inputView: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    height: 50,
    paddingHorizontal: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: Colors.buttonColor,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    marginBottom: 20,
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
    color: Colors.buttonColor,
    fontSize: 15,
    fontWeight: "bold"
  }
});

export default SignupScreen;
