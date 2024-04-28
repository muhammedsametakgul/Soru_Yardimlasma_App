import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import ImageButton from "../components/ImageButton";
import * as ImagePicker from "expo-image-picker";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import {
  uploadImageAndCreateQuestion
} from "../service/createQuestions";
import GetUserEmail from "../service/GetUserEmail";



const galleryIcon = require("../assets/images/galleryicon.jpg");
const deleteIcon = require("../assets/images/delete.png");

const AddScreen = () => {
  const [text, setText] = useState("");
  const [hasGalleryPermissions, setGalleryPermissions] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userUUID, setUserUUID] = useState(null); 
  const [userEmail, setUserEmail] = useState(null); 

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryPermissions(galleryStatus.status === "granted");
    }
  )();

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUUID(user.uid);
        setUserEmail(GetUserEmail()); 
      } else {
        setUserUUID(null); 
      }
    });

    return () => unsubscribe();
  }, []);

 

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result.assets[0].uri);

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const deleteImage = () => {
    setImage(null);
  };

  if (hasGalleryPermissions === false) {
    alert("Erişim Yok");
  }

  const handleAddPress = async () => {
    setIsLoading(true);
    await question();
    setIsLoading(false);
  };

  const question = async () => {
    await uploadImageAndCreateQuestion(userEmail, text, image, userUUID,"Matematik","Lineer Cebir"); 
    setText("");
    setImage(null);
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

      <TouchableOpacity style={styles.galleryButton} onPress={pickImage}>
        <Image source={galleryIcon} style={styles.icon} />
      </TouchableOpacity>

      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableOpacity style={styles.deleteButton} onPress={deleteImage}>
            <Image source={deleteIcon} style={styles.deleteIcon} />
          </TouchableOpacity>
        </View>
      )}

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleAddPress}>
          <Text style={styles.buttonText}>Soru Ekle</Text>
        </TouchableOpacity>
      )}      
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    width: "50%",
    alignItems: "center",
    backgroundColor: "green",
  },
  icon: {
    width: 24,
    height: 24,
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
  buttonText: {
    color: "#fff",
    fontSize: 18,
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
  imageContainer: {
    marginTop: 20,
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
  deleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  deleteIcon: {
    width: 20,
    height: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mathQuestionsContainer: {
    marginTop: 20,
    width: "90%",
  },
  mathQuestionsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  mathQuestionText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default AddScreen;
