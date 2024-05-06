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
const google = require("../assets/images/google.png");

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
          onChangeText={(username) => setUsername(username)}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          secureTextEntry
          value={password}
          onChangeText={(password) => setPassword(password)}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <Pressable onPress={() => navigation.navigate("Reset")}>
          <Text style={[styles.forgetText, styles.marginBottom]}>Şifremi unuttum</Text>
        </Pressable>
      </View>

      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </Pressable>
        <Text style={styles.optionsText}>veya</Text>
      </View>

      <View style={styles.mediaIcons}>
        <Image source={google} style={styles.icons} />
      </View>

      <Pressable onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.signupText}>
          Hesabın yok mu? <Text style={styles.orangeBold}>Kaydol</Text>
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 70,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  orangeBold: {
    fontWeight: "bold",
    color: "orange",
  },
  image: {
    height: 250,
    width: 250,
    marginBottom: "10%",
  },
  inputView: {
    gap: 15,
    width: "100%",
    paddingHorizontal: 40,
    marginBottom: 20, 
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 7,
  },
  forgetText: {
    fontSize: 11,
    color: "orange",
    marginTop: 10, 
    marginLeft:210
  },
  marginBottom: {
    marginBottom: 10, 
  },
  button: {
    backgroundColor: "orange",
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonView: {
    width: "100%",
    paddingHorizontal: 50,
  },
  optionsText: {
    textAlign: "center",
    paddingVertical: 10,
    color: "gray",
    fontSize: 13,
    marginBottom: 6,
  },
  mediaIcons: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 23,
  },
  icons: {
    width: 40,
    height: 40,
  },
  signupText: {
    marginTop: 20,
    
  },
});

export default LoginScreen;
