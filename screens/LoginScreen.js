import React, { useState } from "react";
import {
  Alert,
  Button,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { Colors } from "../utils/Colors";
const google = require("../assets/images/google.png");
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    //console.log('Logging in with:', username, password);
  };

  const handleSignup = () => {};
  const [click, setClick] = useState(false);

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
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.rememberView}>
        <View style={styles.switch}>
          <Switch
            value={click}
            onValueChange={setClick}
            trackColor={{ true: "green", false: "gray" }}
          />
          <Text style={styles.rememberText}>Beni hatırla</Text>
        </View>
        <View>
          <Pressable onPress={() => Alert.alert("Şifremi unuttum")}>
            <Text style={styles.forgetText}>Şifremi unuttum</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.buttonView}>
        <Pressable
          style={styles.button}
          onPress={() => Alert.alert("Başarıyla Giriş yaptınız")}
        >
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </Pressable>
        <Text style={styles.optionsText}>veya</Text>
      </View>

      <View style={styles.mediaIcons}>
        <Image source={google} style={styles.icons} />
      </View>

      <Pressable onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.signupText}>
          Hesabın yok mu? <Text style={styles.redBold}>Kaydol</Text>
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
  redBold: {
    fontWeight: 'bold',
    color: 'red',
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
    marginBottom: 5,
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 7,
  },
  rememberView: {
    width: "100%",
    paddingHorizontal: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 8,
  },
  switch: {
    flexDirection: "row",
    gap: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rememberText: {
    fontSize: 13,
  },
  forgetText: {
    fontSize: 11,
    color: "red",
  },
  button: {
    backgroundColor: "red",
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
  footerText: {
    textAlign: "center",
    color: "gray",
  },
  signup: {
    color: "red",
    fontSize: 13,
  },
});

export default LoginScreen;
