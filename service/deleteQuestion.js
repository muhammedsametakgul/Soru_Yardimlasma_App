import { deleteDoc, doc } from 'firebase/firestore';
import { FIRESTORE_DB } from '../config/firebaseConfig';

export const deleteQuestion = async (questionId) => {
  try {
    await deleteDoc(doc(FIRESTORE_DB, 'questions', questionId));
    console.log('Question deleted successfully');
    return { success: true };
  } catch (error) {
    console.error('Error deleting question:', error);
    throw error;
  }
};
