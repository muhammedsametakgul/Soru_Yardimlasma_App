import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  Modal,
} from "react-native";
import CommentBox from "../components/CommentBox";
import Icon from "react-native-vector-icons/FontAwesome";
import { createComment } from "../service/CreateComments";
import { getCommentsForQuestion } from "../service/GetComments";
import { useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import LottieView from "lottie-react-native";
import { Colors } from "../utils/Colors";

const loadingAnimation = require("../assets/animations/animation.json");
const nocomments = require("../assets/images/nocomments.png");

const CommentScreen = () => {
  const [comments, setComments] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const questionId = route.params?.questionId;

    try {
      const commentsData = await getCommentsForQuestion(questionId);
      setComments(commentsData);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }

    setLoading(false);
    setRefreshing(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Galeriye erişim izni gerekiyor!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleAddImage = async () => {
    pickImage();
  };

  const handleCommentSubmit = async () => {
    try {
      const questionId = route.params?.questionId;
      if (!questionId) {
        throw new Error("Question ID not found.");
      }

      setIsLoading(true);

      await createComment(questionId, commentText, selectedImage);

      setSelectedImage(null);
      setCommentText("");

      setIsLoading(false);
      fetchData();
    } catch (error) {
      console.error("Error creating comment:", error);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {comments.length === 0 ? (
              <View style={styles.noCommentsContainer}>
                <Image source={nocomments} style={styles.noCommentsImage} />
                <Text style={styles.noCommentsText}>Henüz cevap yok</Text>
              </View>
            ) : (
              comments.map((comment, index) => (
                <View key={index} style={styles.profileWrapper}>
                  <CommentBox
                    name={comment.userEmail}
                    description={comment.comment}
                    imageSource={{ uri: comment.imageUrl }}
                  />
                </View>
              ))
            )}
          </ScrollView>
          <View style={styles.fixedBottom}>
            <View style={styles.commentContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Yorumunuzu buraya yazın..."
                onChangeText={(text) => setCommentText(text)}
                value={commentText}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
                placeholderTextColor="#888"
              />
              <TouchableOpacity
                style={styles.addImageButton}
                onPress={handleAddImage}
              >
                <Icon name="camera" size={20} color="#FFFFFF" />
              </TouchableOpacity>
              {selectedImage && (
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.selectedImage}
                />
              )}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleCommentSubmit}
              >
                <Text style={styles.submitButtonText}>Gönder</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  contentContainer: {
    paddingBottom: 150,
    marginTop:50
  },
  profileWrapper: {
    alignItems: "center",
    margin: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fixedBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#CCCCCC",
    paddingVertical: 10,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
    maxHeight: 120,
  },
  addImageButton: {
    backgroundColor: Colors.buttonColor,
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: Colors.buttonColor,
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  selectedImage: {
    width: 50,
    height: 50,
    marginLeft: 10,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    marginTop: 10,
  },
  noCommentsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 50,
  },
  noCommentsText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#666666",
    textAlign: "center",
  },
  noCommentsImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
});

export default CommentScreen;
