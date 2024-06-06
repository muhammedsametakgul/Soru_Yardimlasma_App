import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  TextInput,
  Text,
  Alert,
  Share,
  ScrollView,
} from "react-native";
import { Avatar, Title, Caption, TouchableRipple } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import {
  signOut,
  updateProfile,
  updateEmail,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { Colors } from "../utils/Colors";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState(auth.currentUser.displayName);
  const [email, setEmail] = useState(auth.currentUser.email);

  const [modalVisible, setModalVisible] = useState(false);
  const [usageModalVisible, setUsageModalVisible] = useState(false);
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
    navigation.navigate("MyQuestions");
  };

  const navigateToChangePassword = () => {
    navigation.navigate("ChangePassword");
  };

  const handleSaveChanges = async () => {
    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        navigation.navigate("SignIn");
        return;
      }

      if (newUsername.length > 0) {
        await updateProfile(currentUser, { displayName: newUsername });
        setUsername(newUsername);
        setNewUserName("");
        await currentUser.reload();
      }

      if (newEmail.length > 0 && newEmail !== email) {
        await updateEmail(currentUser, newEmail);
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

  const handleShareApp = async () => {
    try {
      const result = await Share.share({
        message:
          "Hadi sen de gel bu uygulamaya: https://github.com/muhammedsametakgul/Soru_Yardimlasma_App",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Paylaşım gerçekleştirildi:", result.activityType);
        } else {
          console.log("Paylaşım gerçekleştirildi");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Paylaşım iptal edildi");
      }
    } catch (error) {
      console.error("Paylaşma hatası:", error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoContainer}>
        <View style={styles.userInfoText}>
          <Title style={styles.title}>{username}</Title>
          <Caption style={styles.caption}>{email}</Caption>
        </View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.editButton}
        >
          <Icon name="pencil" color="#000" size={18} />
        </TouchableOpacity>
      </View>
      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={navigateToMyQuestions}>
          <View style={styles.menuItem}>
            <Icon name="bookmark-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Sorduğum Sorular</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={handleShareApp}>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Arkadaşlarınla Paylaş</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => setUsageModalVisible(true)}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Kullanım Kılavuzu</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={navigateToChangePassword}>
          <View style={styles.menuItem}>
            <Icon name="lock-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Şifre Değiştir</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={handleSendVerificationEmail}>
          <View style={styles.menuItem}>
            <Icon name="email-outline" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Doğrulama E-postası Gönder</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={handleSignOut}>
          <View style={styles.menuItem}>
            <Icon name="logout" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Çıkış Yap</Text>
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
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveChanges}
            >
              <Text style={styles.buttonText}>Kaydet</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>İptal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={usageModalVisible}
        onRequestClose={() => {
          setUsageModalVisible(!usageModalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>Kullanım Kılavuzu</Text>
              <Text style={styles.titleModal}>Soru Eklemek</Text>
              <Text style={styles.usageText}>1. Soru Eklemek için Alt kısımda bulunan bölümden EKLE butonuna tıklayın</Text>
              <Text style={styles.usageText}>2. Soru Metni, Ders ve Konu zorunlu olmak kaydıyla görsel isteğe bağlı olacak şekilde sorunuzu sisteme yükleyin</Text>
              <Text style={styles.usageText}>3. Ekle butonuna tıklayınız</Text>
              <Text style={styles.usageText}> - - - - - - - - - - - - - - </Text>
              <Text style={styles.titleModal}>Soru Cevaplamak</Text>
              <Text style={styles.usageText}>1. Cevaplamak istediğiniz soruyu seçiniz ve sorunun sağ altında bulunan yorum simgesine tıklayınız</Text>
              <Text style={styles.usageText}>2. Cevap  Metni zorunlu olmak kaydıyla görsel isteğe bağlı olacak şekilde sorunuzu sisteme yükleyin</Text>
              <Text style={styles.usageText}>3. Ekle butonuna tıklayınız</Text>
              <Text style={styles.usageText}> - - - - - - - - - - - - - - </Text>
              <Text style={styles.titleModal}>Soru Filtrelemek</Text>
              <Text style={styles.usageText}>1. Anasayfada bulunana filtreleme butonuna tıklayınız</Text>
              <Text style={styles.usageText}>2. Ders ve Konu seçiniz</Text>
              <Text style={styles.usageText}>3. Filtrele butonuna tıklayınız</Text>
              <Text style={styles.usageText}> - - - - - - - - - - - - - - </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setUsageModalVisible(false)}
              >
                <Text style={styles.buttonText}>Kapat</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 15,
    marginTop: -40,
    elevation: 5,
    marginTop: 10,
  },
  userInfoText: {
    marginLeft: 15,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    color: "#777",
  },
  avatar: {
    backgroundColor: "#eee",
  },
  editButton: {
    backgroundColor: "#eee",
    borderRadius: 20,
    padding: 5,
  },
  menuWrapper: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    elevation: 2,
  },
  menuItemText: {
    color: "#333",
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
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: 300,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: Colors.mainColor,
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "#777",
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "#FF6347",
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  usageText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    textAlign: "left",
  },
  titleModal: {
    fontSize: 18,
    color: "#000",
    marginBottom: 10,
    textAlign: "left",
    fontWeight: "bold",
  },
});

export default ProfileScreen;
