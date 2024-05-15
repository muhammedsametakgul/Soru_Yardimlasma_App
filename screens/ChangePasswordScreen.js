import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { auth } from '../config/firebaseConfig';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { Colors } from '../utils/Colors';


const ChangePasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleChangePassword = async () => {
    try {
      if (!auth.currentUser) {
        throw new Error('Kullanıcı oturum açmamış.');
      }

      if (newPassword !== confirmNewPassword) {
        throw new Error('Yeni şifreler eşleşmiyor.');
      }

      const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);

      await updatePassword(auth.currentUser, newPassword);

      Alert.alert('Başarılı', 'Şifreniz başarıyla güncellendi.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error) {
      console.error('Şifre değiştirme hatası:', error.message);
      if (error.code === 'auth/weak-password') {
        Alert.alert('Hata', 'Yeni şifre yeterince güçlü değil.');
      } else {
        Alert.alert('Hata', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Mevcut Şifre"
        autoCapitalize="none"
        value={currentPassword}
        onChangeText={(currentPassword) => setCurrentPassword(currentPassword)}
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Yeni Şifre"
        autoCapitalize="none"
        value={newPassword}
        onChangeText={(newPassword) => setNewPassword(newPassword)}
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Yeni Şifre Onayı"
        autoCapitalize="none"
        value={confirmNewPassword}
        onChangeText={(confirmNewPassword) => setConfirmNewPassword(confirmNewPassword)}
      />
      <Button title="Şifreyi Değiştir" onPress={handleChangePassword} style={styles.buttonChangePassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonChangePassword:{
    backgroundColor: Colors.buttonColor
  }
});

export default ChangePasswordScreen;
