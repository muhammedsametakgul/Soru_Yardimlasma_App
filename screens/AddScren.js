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
import MultilineTextInput from "../components/TextInput";
import ImageButton from "../components/ImageButton";
import { Button } from "react-native-paper";
import { FIRESTORE_DB } from "../firebaseConfig";
import { addDoc, collection } from "@firebase/firestore";

const plus = require("../assets/images/plus.png");
const galleryIcon = require("../assets/images/galleryicon.jpg");

const AddScreen = () => {
  const [text, setText] = useState("");

  const openGallery = () => {
    console.log("Galeri açıldı");
  };

  const handleAddPress = () => {
    if (text.trim() === "") {
      Alert.alert("Uyarı", "Metin girmelisiniz.");
      return;
    }
    console.log("Metin eklendi:", text);
    setText("");
  };


  const question= async() =>{
    const doc =addDoc(collection(FIRESTORE_DB,'question'), {title:'Test',question:'Test'})
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <MultilineTextInput value={text} onChangeText={setText} />
      </View>
     
      <View style={styles.buttonContainer}>
        <View style={styles.buttonFrame}>
          <ImageButton imageSource={galleryIcon} text={"Gallery"} />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleAddPress}>
          <Text style={styles.buttonText} onPress={() =>question()}>Soru Ekle</Text>
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
    marginTop: "10%",
    alignItems: "center",
    width: "100%",
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
    padding : 10
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
    backgroundColor: '#000',
    marginTop : '10%',
    width : '60%'
  },
});

export default AddScreen;
