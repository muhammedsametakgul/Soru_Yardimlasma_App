import { addDoc, collection } from 'firebase/firestore';
import { FIRESTORE_DB } from "../config/firebaseConfig";

export const createQuestion = async (title, questionText) => {
  try {
    const addedQuestion =addDoc(collection(FIRESTORE_DB,'question'), {title:title,question:questionText})
    return addedQuestion
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error; // throw the error for handling in the component
  }
};
