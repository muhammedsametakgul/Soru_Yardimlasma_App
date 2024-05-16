import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,Modal
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import { FIRESTORE_DB } from "../config/firebaseConfig";
import { deleteQuestion } from "../service/deleteQuestion";
import { Colors } from "../utils/Colors";


const EditableBox = ({ name, description, imageSource, questionId, date,lesson,subject }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
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
    navigation.navigate('UpdateQuestion', { questionId: questionId });
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
        <Icon name="comment" size={20} color="#FFF" />
        <Text style={styles.commentsButtonText}>Cevaplara Git</Text>
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
  menuButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
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
    backgroundColor: Colors.buttonColor,
    borderRadius: 16,
    alignItems: "center",
  },
  
  commentsButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    marginLeft: 5, 
  },
  lessonSubjectContainer: {
    alignItems: "flex-start",
  },
  lessonSubject: {
    fontSize: 12,
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
