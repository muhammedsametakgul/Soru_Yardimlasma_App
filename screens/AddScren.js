import React, { useState } from "react";
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
} from "react-native";
import ImageButton from "../components/ImageButton";
import { Button } from "react-native-paper";
import { FIRESTORE_DB } from "../config/firebaseConfig";
import { addDoc, collection } from "@firebase/firestore";
import { createQuestion } from "../service/createQuestions";

const plus = require("../assets/images/plus.png");
const galleryIcon = require("../assets/images/galleryicon.jpg");

const AddScreen = () => {
  const [text, setText] = useState("");

  const openGallery = () => {
    console.log("Galeri açıldı");
  };

  const handleAddPress = () => {
    console.log(text);
    question();
  };

  const question = async () => {
    createQuestion("sametak", text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          multiline={true}
          onChangeText={(text) => setText(text)}
          value={text}
          placeholder="Sorunuzu giriniz"
          placeholderTextColor="gray"
        />
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonFrame}>
          <ImageButton imageSource={galleryIcon} text={"Gallery"} />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleAddPress}>
          <Text style={styles.buttonText} onPress={handleAddPress}>
            Soru Ekle
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  inputContainer: {
    padding: 10,
    backgroundColor: "#fff",
    width: "98%",
  },
  galleryButton: {
    marginTop: "2%",
    backgroundColor: "green",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    width: "50%",
    textAlign: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: "10%",
  },
  buttonFrame: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "gray",
    marginBottom: 20,
    padding: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  button: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#000",
    marginTop: "10%",
    width: "60%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    padding: 10,
    fontSize: 16,
    minHeight: 250,
    textAlign: "left",
    textAlignVertical: "top",
  },
});

export default AddScreen;
