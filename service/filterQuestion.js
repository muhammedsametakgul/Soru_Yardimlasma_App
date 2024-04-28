// filterQuestion.js

import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { FIRESTORE_DB } from "../config/firebaseConfig";

export const filterQuestion = async (lesson = null, subject = null) => {
  try {
    let q = collection(FIRESTORE_DB, 'questions');

    if (lesson && subject) {
      q = query(q, where('lesson', '==', lesson), where('subject', '==', subject));
    } else if (lesson) {
      q = query(q, where('lesson', '==', lesson));
    } else if (subject) {
      q = query(q, where('subject', '==', subject));
    }

    
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
    console.error("filterQuestion fonksiyonunda bir hata oluştu:", error);
    return []; 
  }
};
