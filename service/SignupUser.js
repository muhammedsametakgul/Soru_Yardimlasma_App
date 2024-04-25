// AuthService.js

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../config/firebaseConfig"; // firebaseConfig dosyanızın doğru yerini gösterdiğinizden emin olun

const signUpWithEmailAndPassword = async (email, password, username) => {
  try {
    // Firebase'den kullanıcı oluştur
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Kullanıcının profilini güncelle (displayName ekleyerek)
    await updateProfile(userCredential.user, {
      displayName: username
    });

    // Oluşturulan kullanıcıyı döndür
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export { signUpWithEmailAndPassword };
