import { doc, updateDoc } from 'firebase/firestore';
import { FIRESTORE_DB } from "../config/firebaseConfig";

const updateQuestion = async (questionId, newQuestion, newImageUrl) => {
  try {
    const questionRef = doc(FIRESTORE_DB, 'questions', questionId);
    await updateDoc(questionRef, {
      question: newQuestion,
      imageUrl: newImageUrl
    });
    console.log("Question successfully updated!");
  } catch (error) {
    console.error("Error updating question:", error);
    throw error;
  }
};

export default updateQuestion;
