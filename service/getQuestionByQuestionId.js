import { doc, getDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from "../config/firebaseConfig";

const getQuestionByQuestionId = async (questionId) => {
  try {
    const questionRef = doc(FIRESTORE_DB, 'questions', questionId);
    const questionDoc = await getDoc(questionRef);
    if (questionDoc.exists()) {
      return {
        id: questionDoc.id,
        ...questionDoc.data()
      };
    } else {
      throw new Error("Question not found");
    }
  } catch (error) {
    console.error("Error fetching question:", error);
    throw error;
  }
};

export default getQuestionByQuestionId;
