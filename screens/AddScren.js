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
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import LottieView from "lottie-react-native"; 

import {
  uploadImageAndCreateQuestion
} from "../service/createQuestions";

const galleryIcon = require("../assets/images/galleryicon.jpg");
const cameraIcon = require("../assets/images/galleryicon.jpg");
const deleteIcon = require("../assets/images/delete.png");
const loadingAnimation = require("../assets/animations/loading.json"); 

const AddScreen = () => {
  const [text, setText] = useState("");
  const [hasGalleryPermissions, setGalleryPermissions] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userUUID, setUserUUID] = useState(null); 
  const [userEmail, setUserEmail] = useState(null); 
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setGalleryPermissions(galleryStatus.status === "granted");
    })();
  
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUUID(user.uid);
        setUserEmail(user.email); 
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

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      console.log("Çekilen fotoğraf URI'si:", result.assets[0].uri);
    } else {
      console.log("Kullanıcı fotoğraf çekmeyi iptal etti veya bir hata oluştu.");
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
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Image source={galleryIcon} style={styles.icon} />
          <Text style={styles.buttonText}>Görsel Seç</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Image source={cameraIcon} style={styles.icon} />
          <Text style={styles.buttonText}>Kamera ile Çek</Text>
        </TouchableOpacity>
      </View>

      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableOpacity style={styles.deleteButton} onPress={deleteImage}>
            <Image source={deleteIcon} style={styles.deleteIcon} />
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleAddPress}>
        <Text style={styles.buttonText}>Soru Ekle</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isLoading}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <LottieView
              source={loadingAnimation}
              autoPlay
              loop
              style={{ width: 200, height: 200 }}
            />
            <Text style={styles.modalText}>Yükleniyor...</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop:50
  },
  inputContainer: {
    padding: 10,
    backgroundColor: "#fff",
    width: "98%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
  },
  buttonText: {
    fontSize: 16,
    color: "black",
    marginLeft: 10,
  },
  icon: {
    width: 24,
    height: 24,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginTop: 20,
  },
});

export default AddScreen;
