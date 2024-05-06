import React, { useState } from "react";
import { Alert, Button, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { auth } from "../config/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

const PasswordResetScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert(
          "Şifre Sıfırlama Bağlantısı Gönderildi",
          "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.",
          [{ text: "Tamam", onPress: () => navigation.navigate("Login") }]
        );
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert(errorMessage);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Şifremi Unuttum</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(email) => setEmail(email)}
        autoCorrect={false}
        autoCapitalize="none"
      />
      <Pressable style={styles.button} onPress={handlePasswordReset}>
        <Text style={styles.buttonText}>Şifre Sıfırlama Bağlantısı Gönder</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default PasswordResetScreen;
