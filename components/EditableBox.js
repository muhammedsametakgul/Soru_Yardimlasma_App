import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import { FIRESTORE_DB } from "../config/firebaseConfig";
import { deleteQuestion } from "../service/deleteQuestion";

const EditableBox = ({ name, description, imageSource, questionId, date }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  const handleImagePress = () => {
  };

  const handleCommentsPress = () => {
    navigation.navigate('Comment', { questionId });
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleUpdatePress = () => {
    setMenuVisible(false); 
  };

  const handleDeletePress = async () => {
    setMenuVisible(false); 
    console.log("Silinecek belgenin doc id'si: ", questionId); 

    try {
      deleteQuestion(questionId)
      console.log("Belge başarıyla silindi.");
    } catch (error) {
      console.error("Belge silinirken bir hata oluştu: ", error);
    }
  };

  const handleCancelPress = () => {
    setMenuVisible(false); 
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
        <Icon name="ellipsis-v" size={20} color="#000" />
      </TouchableOpacity>
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
      {menuVisible && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity style={styles.dropdownMenuItem} onPress={handleUpdatePress}>
            <Text style={styles.dropdownMenuItemText}>Güncelle</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownMenuItem} onPress={handleDeletePress}>
            <Text style={styles.dropdownMenuItemText}>Sil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownMenuItem} onPress={handleCancelPress}>
            <Text style={styles.dropdownMenuItemText}>İptal</Text>
          </TouchableOpacity>
        </View>
      )}
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
    position: 'relative', 
  },
  menuButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
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
    position: "absolute",
    bottom: 10,
    right: 10,
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
    paddingVertical: 4, 
    paddingHorizontal: 8, 
    backgroundColor: "#007AFF",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  commentsButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    marginLeft: 5, 
  },
  dropdownMenu: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
    zIndex: 1,
  },
  dropdownMenuItem: {
    padding: 10,
  },
  dropdownMenuItemText: {
    fontSize: 16,
    color: "#000",
  },
});

export default EditableBox;
