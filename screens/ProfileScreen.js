import React from "react";
import { View, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from "./HomeScreen";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth"; // Firebase Authentication'dan signOut fonksiyonunu içe aktarın
import { auth } from "../config/firebaseConfig"; // Firebase yapılandırma dosyanızdan auth nesnesini içe aktarın


const handleSignOut = async () => {
  try {
      await signOut(auth); // Firebase Authentication'dan oturumu kapat
      // Oturumu kapattıktan sonra kullanıcıyı giriş ekranına yönlendirin
  } catch (error) {
      console.error('Oturum kapatma hatası:', error);
  }
};

const ProfileScreen = () => {
  const navigation = useNavigation();

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
              Muhammed Samet Akgül
            </Title>
            <Caption style={styles.caption}>msametakgul@gmail.com</Caption>
          </View>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>3</Title>
            <Caption>Sorulan Soru Sayısı</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>12</Title>
            <Caption>Çözülen Soru Sayısı</Caption>
          </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="bookmark" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Kaydedilen Sorular</Text>
          </View>
        </TouchableRipple>
        
        <TouchableRipple onPress={HomeScreen}>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Arkadaşlarınla Paylaş</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Destek Ol</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={handleSignOut}>
          <View style={styles.menuItem}>
            <Icon name="account-circle" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Ayarlar</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-details" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Profili Düzenle</Text>
          </View>
        </TouchableRipple>
      </View>

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
});

export default ProfileScreen;
