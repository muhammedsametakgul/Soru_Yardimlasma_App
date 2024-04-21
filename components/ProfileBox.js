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

const ProfileBox = ({ name, description, imageSource, questionId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleImagePress = () => {
    setModalVisible(true);
  };

  const handleCommentsPress = () => {
    navigation.navigate('Comment', { questionId }); // questionId'yi CommentScreen'e iletiyoruz
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Text style={styles.profileName}>{name}</Text>
        <View style={styles.separator}></View>
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
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  description: {
    marginVertical: 10,
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
    padding: 8,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    alignItems: "center",
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
  },
  modalImage: {
    width: "90%",
    height: "90%",
    borderRadius: 10,
  },
});

export default ProfileBox;
