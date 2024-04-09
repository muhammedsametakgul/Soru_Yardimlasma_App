import { collection, getDocs } from 'firebase/firestore';
import { FIRESTORE_DB } from "../config/firebaseConfig";

export const readQuestions = async () => {
  const querySnapshot = await getDocs(collection(FIRESTORE_DB, 'questions'));
  const questions = [];
  querySnapshot.forEach((doc) => {
    questions.push({
      id: doc.id,
      ...doc.data()
    });
  });
  return questions;
};
