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
import { Ionicons } from "@expo/vector-icons";

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
    if (!selectedLesson) {
      Alert.alert("Eksik Bilgi", "Lütfen Ders Seçiniz ", [{ text: "Tamam" }]);
      return;
    } else if (!selectedTopic) {
      Alert.alert("Eksik Bilgi", "Lütfen Konu Seçiniz ", [{ text: "Tamam" }]);
      return;
    } else if (!text) {
      Alert.alert("Eksik Bilgi", "Lütfen Soru Metnini Giriniz ", [
        { text: "Tamam" },
      ]);
      return;
    }
  
    Alert.alert(
      "Soru Paylaş",
      "Soruyu paylaşmak istediğinize emin misiniz?",
      [
        {
          text: "İptal",
          style: "cancel",
        },
        {
          text: "Evet",
          onPress: async () => {
            setIsLoading(true);
            await question();
            setIsLoading(false);
            setLessonComponentKey((prevKey) => prevKey + 1);
          },
        },
      ]
    );
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
          placeholderTextColor={Colors.placeholderText}
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
        <Ionicons name="camera" size={24} color="#fff" />
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

      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
          <Text style={styles.buttonTextAdd}>Soruyu Paylaş</Text>
        </TouchableOpacity>
      </View>

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
    backgroundColor: "#f0f2f5",
  },
  inputContainer: {
    padding: 10,
    backgroundColor: "#f0f2f5",
    color: Colors.textColor,
    fontWeight: "bold",
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
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: Colors.mainColor,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.buttonText,
    marginLeft: 10,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: Colors.buttonText,
  },

  optionButton: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
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
    borderColor: Colors.inputBorder,
    borderRadius: 20,
    padding: 15,
    fontSize: 14,
    minHeight: 200,
    textAlign: "left",
    textAlignVertical: "top",
    overflow: "scroll",
    backgroundColor:"#fff"
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
    width: 24,
    height: 24,
    tintColor: Colors.deleteIcon,
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
    backgroundColor: Colors.lessonComponentBackground,
    borderRadius: 10
  },

  addButtonContainer: {
    position: "absolute",
    bottom: 80,
    right: 30,
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: Colors.mainColor,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  buttonTextAdd: {
    fontSize: 12,
    color: Colors.buttonText,
  },
  galleryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    backgroundColor: Colors.galleryButtonBackground,
  },
  galleryButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.galleryButtonText,
  },
});

export default AddScreen;
