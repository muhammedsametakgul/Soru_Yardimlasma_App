// AddScreen.js dosyasında

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
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LottieView from "lottie-react-native";

import { uploadImageAndCreateQuestion } from "../service/createQuestions";
import LessonComponent from "../components/LessonComponent";
import { Colors } from "../utils/Colors";

const galleryIcon = require("../assets/images/galleryicon.jpg");
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
  const [selectedLesson, setSelectedLesson] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [lessonComponentKey, setLessonComponentKey] = useState(0); 

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

  const pickImage = async (sourceType) => {
    let result;
    if (sourceType === "gallery") {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
    } else if (sourceType === "camera") {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
    }

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
    if (!selectedLesson  ) {
      Alert.alert(
        "Eksik Bilgi",
        "Lütfen Ders Seçiniz ",
        [{ text: "Tamam" }]
      );
      return;
    }
    else if (!selectedTopic  ) {
      Alert.alert(
        "Eksik Bilgi",
        "Lütfen Konu Seçiniz ",
        [{ text: "Tamam" }]
      );
      return;
    } 
    else if (!text  ) {
      Alert.alert(
        "Eksik Bilgi",
        "Lütfen Soru Metnini Giriniz ",
        [{ text: "Tamam" }]
      );
      return;
    }
    setIsLoading(true);
    await question();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    setLessonComponentKey(prevKey => prevKey + 1);
  };
  

  
  const question = async () => {
    await uploadImageAndCreateQuestion(
      userEmail,
      text,
      image,
      userUUID,
      selectedLesson,
      selectedTopic
    );
    setText("");
    setImage(null);
  };

  const handleLessonAndTopicSelect = (lesson, topic) => {
    setSelectedLesson(lesson);
    setSelectedTopic(topic);
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

      <View style={styles.lessonComponentContainer}>
  <LessonComponent 
    onSelectLessonAndTopic={handleLessonAndTopicSelect}  
    key={lessonComponentKey}
  />
</View>

      <TouchableOpacity
        style={[styles.button, { marginBottom: 20 }]}
        onPress={() => setModalVisible(true)}
      >
        <Image source={galleryIcon} style={styles.icon} />
        <Text style={styles.buttonText}>Görsel Seç</Text>
      </TouchableOpacity>

      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableOpacity style={styles.deleteButton} onPress={deleteImage}>
            <Image source={deleteIcon} style={styles.deleteIcon} />
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleAddPress}>
        <Text style={styles.buttonText}>Soruyu Paylaş</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                pickImage("gallery");
                setModalVisible(false);
              }}
            >
              <Text style={styles.optionText}>Galeriden Seç</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                pickImage("camera");
                setModalVisible(false);
              }}
            >
              <Text style={styles.optionText}>Kamera ile Çek</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
    marginTop: 50,
  },
  inputContainer: {
    padding: 10,
    backgroundColor: "#fff",
    color: Colors.textColor,
    fontWeight:"bold",
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
    backgroundColor : Colors.buttonColor,
  },
  buttonText: {
    fontSize: 16,
    color: "black",
    marginLeft: 10,
  },
  optionButton: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical :8
  },
  optionText: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
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
    marginBottom: 20,
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
  lessonComponentContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.lessonComponentBackground,
    borderRadius: 10,
  },
  
});

export default AddScreen;
