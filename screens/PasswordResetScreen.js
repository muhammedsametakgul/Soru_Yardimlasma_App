import React, { useState } from "react";
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { auth } from "../config/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { Colors } from "../utils/Colors";

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
        if (error.code === 'auth/user-not-found') {
          Alert.alert("Böyle bir kullanıcı bulunamadı.");
        } else {
          Alert.alert(error.message);
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Şifremi Unuttum</Text>
        <Text style={styles.subtitle}>Lütfen e-posta adresinizi girin, size bir şifre sıfırlama bağlantısı gönderelim.</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Pressable style={styles.button} onPress={handlePasswordReset}>
          <Text style={styles.buttonText}>Şifre Sıfırlama Bağlantısı Gönder</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  innerContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.buttonColor,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: Colors.buttonColor,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PasswordResetScreen;
