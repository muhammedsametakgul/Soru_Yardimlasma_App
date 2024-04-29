import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';

const ProfileBox = ({ name, description, imageSource, questionId, date }) => {
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
      <Text style={styles.description}>{description}</Text>
      {imageSource && imageSource.uri !== null ? (
        <TouchableOpacity onPress={handleImagePress}>
          <Image source={imageSource} style={styles.image} />
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity style={styles.commentsButton} onPress={handleCommentsPress}>
        <Icon name="comment" size={20} color="#FFFFFF" />
        <Text style={styles.commentsButtonText}>Yorumlara Git</Text>
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
    backgroundColor: "#e1e2e3", 
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
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
  },
  commentsButton: {
    flexDirection: "row", 
    alignSelf: "flex-start",
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007AFF",
    borderRadius: 25, 
    alignItems: "center",
    justifyContent: "center",
  },
  commentsButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    marginLeft: 5, 
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
});

export default ProfileBox;
