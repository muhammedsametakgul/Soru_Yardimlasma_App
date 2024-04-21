import { addDoc, collection, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { FIRESTORE_DB, STORAGE } from "../config/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import { getAuth } from 'firebase/auth';

export const createComment = async (questionId, commentText, imageUri) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User is not authenticated.");
    }

    let imageUrl = null;
    if (imageUri) {
      imageUrl = await uploadImageToStorage(imageUri);
    }

    const timestamp = serverTimestamp();

    const addedCommentRef = await addDoc(collection(FIRESTORE_DB, `comments`), {
      userEmail: user.email,
      comment: commentText,
      imageUrl: imageUrl,
      createdAt: timestamp,
      questionId: questionId 
    });

    const addedCommentId = addedCommentRef.id;
    console.log("Added comment ID:", addedCommentId);

    return addedCommentRef;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

export const uploadImageToStorage = async (localUri) => {
  try {
    const storageRef = ref(STORAGE, 'images/' + Date.now() + '.jpg');

    const response = await fetch(localUri);
    const blob = await response.blob();

    await uploadBytes(storageRef, blob);

    const downloadURL = await getDownloadURL(storageRef);
    
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image to storage:", error);
    throw error;
  }
};

export const getCommentsForQuestion = async (questionId) => {
  try {
    const commentsQuery = query(collection(FIRESTORE_DB, `questions/${questionId}/comments`));
    const querySnapshot = await getDocs(commentsQuery);
    const comments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return comments;
  } catch (error) {
    console.error("Error getting comments for question:", error);
    throw error;
  }
};
