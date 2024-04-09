import { addDoc, collection } from 'firebase/firestore';
import { FIRESTORE_DB, STORAGE } from "../config/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 


export const createQuestion = async (title, questionText) => {
  try {
    const addedQuestion =addDoc(collection(FIRESTORE_DB,'question'), {title:title,question:questionText})
    return addedQuestion
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error; 
  }
};



export const uploadImageAndCreateQuestion = async (title, questionText, imageUri) => {
  try {
    const imageUrl = await uploadImageToStorage(imageUri);    

    const addedQuestionRef = await addDoc(collection(FIRESTORE_DB, 'questions'), {
      title: title,
      question: questionText,
      imageUrl: imageUrl
    });

    const addedQuestionId = addedQuestionRef.id;
    console.log("Added question ID:", addedQuestionId);

    return addedQuestionRef;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};


//To get image URL, we need to add it to Firebase Storage ( Msametakgul)
export const uploadImageToStorage = async (localUri) => {
  try {
    const storageRef = ref(STORAGE, 'images/' + Date.now() + '.jpg');

    const response = await fetch(localUri);
    const blob = await response.blob();

    await uploadBytes(storageRef, blob);

    const downloadURL = await getDownloadURL(storageRef);
    
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image to storage:", error);
    throw error;
  }
};