import React, { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Colors } from "../utils/Colors";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        console.log("Başarıyla giriş yapıldı");
      })
      .catch((error) => {
        const errorMessage = error.message;
        if (errorMessage.includes("invalid-email") || errorMessage.includes("wrong-password")) {
          Alert.alert("Oppps!! Email veya Şifre hatalı. Lütfen kontrol edip tekrar deneyiniz");
        } else {
          Alert.alert(errorMessage);
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/images/YKS.png")}
        style={styles.image}
      />
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={username}
          onChangeText={setUsername}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize="none"
          placeholderTextColor="#888"
        />
        <Pressable onPress={() => navigation.navigate("Reset")}>
          <Text style={styles.forgetText}>Şifremi unuttum</Text>
        </Pressable>
      </View>

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.signupText}>
          Hesabın yok mu? <Text style={styles.boldRegister}>Kaydol</Text>
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
    backgroundColor: "#f0f4f8",
  },
  boldRegister: {
    fontWeight: "bold",
    color: Colors.buttonColor,
  },
  image: {
    height: 150,
    width: 150,
    marginBottom: 40,
    borderRadius: 75, 
  },
  inputView: {
    width: "90%",
    marginBottom: 20,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  forgetText: {
    fontSize: 14,
    color: Colors.buttonColor,
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.buttonColor,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupText: {
    color: "gray",
    fontSize: 16,
  },
});

export default LoginScreen;
