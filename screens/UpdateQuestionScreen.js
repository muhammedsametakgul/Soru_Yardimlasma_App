import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import LottieView from "lottie-react-native"; 
import { useNavigation } from '@react-navigation/native'; 

import {
  uploadImageAndCreateQuestion
} from "../service/createQuestions";
import getQuestionByQuestionId from "../service/getQuestionByQuestionId";
import updateQuestion from "../service/updateQuestion"; 
import { Colors } from "../utils/Colors";

const galleryIcon = require("../assets/images/galleryicon.jpg");
const cameraIcon = require("../assets/images/galleryicon.jpg");
const deleteIcon = require("../assets/images/delete.png");
const loadingAnimation = require("../assets/animations/loading.json"); 

const UpdateQuestionScreen = ({ route }) => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation(); // Navigation hook
  const { questionId } = route.params;

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

  useEffect(() => {
    loadQuestion();
  }, []);

  const loadQuestion = async () => {
    try {
      const questionData = await getQuestionByQuestionId(questionId);
      setText(questionData.question);
      setImage(questionData.imageUrl);
    } catch (error) {
      console.error("Error loading question:", error);
      Alert.alert("Error", "Failed to load question.");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

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
    }
  };
  
  const deleteImage = () => {
    setImage(null);
  };

  const handleUpdatePress = async () => {
    setIsLoading(true);
    await updateQuestion(questionId, text, image);
    setIsLoading(false);
    navigation.navigate('MyQuestions'); 
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

      <TouchableOpacity style={styles.button} onPress={handleUpdatePress}>
        <Text style={styles.buttonText}>Güncelle</Text>
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
                takePhoto();
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
});
export default UpdateQuestionScreen;
