import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { FIRESTORE_DB } from "../config/firebaseConfig";

export const readQuestions = async () => {
  const q = query(collection(FIRESTORE_DB, 'questions'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(q);
  const questions = [];
  querySnapshot.forEach((doc) => {
    questions.push({
      id: doc.id,
      ...doc.data()
    });
  });
  return questions;
};
