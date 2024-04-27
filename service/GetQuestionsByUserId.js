import { collection, query, where, getDocs } from 'firebase/firestore';
import { FIRESTORE_DB } from "../config/firebaseConfig";

const getQuestionsByUserId = async (userId) => {
  try {
    const q = query(collection(FIRESTORE_DB, 'questions'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const questions = [];
    querySnapshot.forEach((doc) => {
      questions.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return questions;
  } catch (error) {
    console.error('Error getting questions by user ID:', error);
    throw error;
  }
};

export default getQuestionsByUserId;
