import { addDoc, collection } from 'firebase/firestore';
import { FIRESTORE_DB } from "../config/firebaseConfig";

export const createQuestion = async (title, questionText) => {
  try {
    const docRef = await addDoc(collection(FIRESTORE_DB, 'question'), { title, question: questionText });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id; // return the ID of the newly created document
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error; // throw the error for handling in the component
  }
};
