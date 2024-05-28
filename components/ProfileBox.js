import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import { Colors } from "../utils/Colors";

const ProfileBox = ({ name, description, imageSource, questionId, date, lesson, subject }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleImagePress = () => {
    setModalVisible(true);
  };

  const handleCommentsPress = () => {
    navigation.navigate('Comment', { questionId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Text style={styles.profileName}>{name}</Text>
        <Text style={styles.date}>{date}</Text> 
      </View>
      <View style={styles.bodyStyle}>
        <Text style={styles.description}>{description}</Text>
        {imageSource && imageSource.uri !== null ? (
          <TouchableOpacity onPress={handleImagePress}>
            <Image source={imageSource} style={styles.image} />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={styles.lessonSubjectContainer}>
        <Text style={styles.lessonSubject}>{lesson}</Text>
        <Text style={styles.lessonSubject}>{subject}</Text>
      </View>
      <TouchableOpacity style={styles.commentsButton} onPress={handleCommentsPress}>
        <Icon name="comment" size={20} color="#000" />
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setModalVisible(false)}
            activeOpacity={0.5}
          >
            <Text style={styles.modalCloseText}>X</Text>
          </TouchableOpacity>
          {imageSource && (
            <Image
              source={imageSource}
              style={styles.modalImage}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "105%",
    backgroundColor: "#f2f2f2", 
    padding: 20,
    marginVertical: 3,
    elevation: 3,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "#CCCCCC",
    borderBottomColor: "#CCCCCC",
    borderRadius: 10, 
  },
  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  profileName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  date: {
    fontSize: 12,
    color: "#777",
  },
  description: {
    marginVertical: 10,
    fontSize: 14,
    color: "#555555",
    fontWeight:"bold"
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    marginBottom:20
  },
  commentsButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    flexDirection: "row", 
    paddingVertical: 8, 
    paddingHorizontal: 12, 
    backgroundColor: "#FFF",
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  commentsButtonText: {
    color: "#333",
    fontWeight: "bold",
    marginLeft: 5, 
  },
  lessonSubjectContainer: {
    alignItems: "flex-start",
  },
  lessonSubject: {
    fontSize: 10,
    color: "#777",
    fontStyle: "italic",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalCloseButton: {
    position: "absolute",
    top: 30,
    right: 20,
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
  },
  modalCloseText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333",
  },
  modalImage: {
    width: "90%",
    height: "90%",
    borderRadius: 10,
  },
  bodyStyle:{
    marginBottom:10
  }
});

export default ProfileBox;
