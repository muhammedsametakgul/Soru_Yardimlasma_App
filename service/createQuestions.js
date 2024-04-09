import { addDoc, collection } from 'firebase/firestore';
import { FIRESTORE_DB } from "../config/firebaseConfig";

export const createQuestion = async (title, questionText) => {
  try {
    const addedQuestion =addDoc(collection(FIRESTORE_DB,'question'), {title:title,question:questionText})
    return addedQuestion
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error; 
  }
};
/* 
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { FIRESTORE_DB, STORAGE } from "../config/firebaseConfig";

export const uploadImageAndCreateQuestion = async (title, questionText, imageFile) => {
  try {
    const storageRef = ref(STORAGE, 'images/' + imageFile.name);
    await uploadBytes(storageRef, imageFile);

    const imageUrl = await getDownloadURL(storageRef);

    const addedQuestion = await addDoc(collection(FIRESTORE_DB, 'question'), {
      title: title,
      question: questionText,
      imageUrl: imageUrl // Firestore'a eklenen belgeye görsel URL'sini ekleyin
    });

    return addedQuestion;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error; 
  }
};

Bu fonksiyon galeriden görsel alındıktan sonra test edilecektir
*/