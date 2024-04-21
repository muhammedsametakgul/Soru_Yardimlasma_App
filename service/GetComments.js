import { query, collection, getDocs, where } from 'firebase/firestore'; 
import { FIRESTORE_DB } from '../config/firebaseConfig';


export const getCommentsForQuestion = async (questionId) => {
    try {
      const commentsQuery = query(collection(FIRESTORE_DB, 'comments'), where('questionId', '==', questionId));
      const querySnapshot = await getDocs(commentsQuery);
      const comments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return comments;
    } catch (error) {
      console.error("Error getting comments for question:", error);
      throw error;
    }
};


 