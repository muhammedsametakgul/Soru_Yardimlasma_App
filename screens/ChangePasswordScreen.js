import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Pressable, Text } from 'react-native';
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
        onChangeText={setCurrentPassword}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Yeni Şifre"
        autoCapitalize="none"
        value={newPassword}
        onChangeText={setNewPassword}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Yeni Şifre Onayı"
        autoCapitalize="none"
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
        placeholderTextColor="#888"
      />
      <Pressable style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Şifreyi Değiştir</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  input: {
    height: 50,
    width: '100%',
    paddingHorizontal: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    color: '#000',
  },
  button: {
    backgroundColor: Colors.buttonColor,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChangePasswordScreen;
