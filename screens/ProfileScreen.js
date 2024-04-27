import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  TextInput,
  Button,
  Alert,
} from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "./HomeScreen";
import { useNavigation } from "@react-navigation/native";
import {
  signOut,
  updateProfile,
  updateEmail,
  updatePassword,
  sendEmailVerification,
} from "firebase/auth"; 
import { auth } from "../config/firebaseConfig";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState(auth.currentUser.displayName);
  const [email, setEmail] = useState(auth.currentUser.email);

  const [modalVisible, setModalVisible] = useState(false);
  const [newUsername, setNewUserName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Oturum kapatma hatası:", error);
    }
  };

  const navigateToMyQuestions = () => {
    navigation.navigate('MyQuestions'); 
  };

  const navigateToChangePassword = () => {
    navigation.navigate('ChangePassword'); 
  };

  const handleSaveChanges = async () => {
    try {
      const currentUser = auth.currentUser;
  
      if (!currentUser) {
        navigation.navigate('SignIn');
        return;
      }
  
      if (newUsername.length > 0) {
        await updateProfile(currentUser, { displayName: newUsername });
        setUsername(newUsername); 
        setNewUserName(""); 
        await currentUser.reload();
      }
      
      if (newEmail.length > 0 && newEmail !== email) {
        await currentUser.reauthenticateWithCredential(reauthenticationCredential);
        await updateEmail(currentUser, newEmail);
        console.log("Email Updated");
        setEmail(newEmail);
        setNewEmail(""); 
      }
  
      setModalVisible(false);
    } catch (error) {
      console.error("Bilgileri güncelleme hatası:", error);
    }
  };
  

  const handleSendVerificationEmail = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      Alert.alert("Başarılı", "Doğrulama e-postası gönderildi.");
    } catch (error) {
      console.error("Doğrulama e-postası gönderme hatası:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            size={80}
          />
          <View style={{ marginLeft: 10 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}
            >
              {username}
            </Title>
            <Caption style={styles.caption}>{email}</Caption>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Icon
              name="pencil"
              color="#777777"
              size={20}
              style={{ marginLeft: 10, marginTop: 20 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}
        >
          <Title>3</Title>
          <Caption>Sorulan Soru Sayısı</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>12</Title>
          <Caption>Çözülen Soru Sayısı</Caption>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() =>navigateToMyQuestions()}>
          <View style={styles.menuItem}>
            <Icon name="bookmark" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Sorduğum Sorular</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={HomeScreen}>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Arkadaşlarınla Paylaş</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Destek Ol</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {navigateToChangePassword()}}>
          <View style={styles.menuItem}>
            <Icon name="account-details" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Şifre Değiştir</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={handleSignOut}>
          <View style={styles.menuItem}>
            <Icon name="account-circle" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Ayarlar</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={handleSendVerificationEmail}>
          <View style={styles.menuItem}>
            <Icon name="email" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Doğrulama E-postası Gönder</Text>
          </View>
        </TouchableRipple>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Bilgileri Düzenle</Text>
            <TextInput
              style={styles.input}
              placeholder="Kullanıcı Adı"
              onChangeText={(text) => setNewUserName(text)}
              value={newUsername} 
            />
            <TextInput
              style={styles.input}
              placeholder="Yeni E-posta"
              onChangeText={(text) => setNewEmail(text)}
              value={newEmail} 
            />
          
            <Button title="Kaydet" onPress={handleSaveChanges} />
            <Button title="İptal" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default ProfileScreen;
