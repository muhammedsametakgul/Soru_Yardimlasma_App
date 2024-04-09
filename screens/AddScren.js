import React, { useEffect, useState } from "react";
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
import * as ImagePicker from 'expo-image-picker' 

import { createQuestion } from "../service/createQuestions";


const galleryIcon = require("../assets/images/galleryicon.jpg");

const AddScreen = () => {
  const [text, setText] = useState("");
  const [hasGalleryPermissions, setGalleryPermissions] = useState(null);
  const [image, setImage] = useState(null);


  useEffect(() =>{
    (async() =>{
      const galleryStatus= await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryPermissions(galleryStatus.status === 'granted');

    })();
  },[])


  const pickImage= async () =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect:[4,3],
      quality:1
    });

    console.log(result)

    if(!result.canceled){
      setImage(result.uri)
    }
  };

  if(hasGalleryPermissions ===false)  {
    alert("Erişim Yok");
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
          <ImageButton imageSource={galleryIcon} text={"Gallery"}  onPress={() =>pickImage()}/>
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
