import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import getQuestionsByUserId from "../service/getQuestionsByUserId";
import { auth } from "../config/firebaseConfig";
import EditableBox from "../components/EditableBox";


const MyQuestionsScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null); 

  useEffect(() => {
    fetchData();
    fetchUserId(); 
  }, []);

  const fetchUserId = () => {
    const currentUser = auth.currentUser; 
    if (currentUser) {
      setUserId(currentUser.uid); 
    }
  };

  const fetchData = async () => {
    try {
      if (!userId) return; 

      const fetchedQuestions = await getQuestionsByUserId(userId);
      console.log("Fetched Questions : "  + fetchedQuestions)
      setQuestions(fetchedQuestions);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <SafeAreaView style={styles.screen}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {questions.length === 0 ? (
            <Text style={styles.noQuestionsText}>Soru Yok</Text>
          ) : (
            questions.map((question, index) => (
              <View key={index} style={styles.profileWrapper}>
                <EditableBox
                  name={question.title}
                  description={question.question}
                  imageSource={{ uri: question.imageUrl }}
                  questionId={question.id}
                  date={question.createdAt.toDate().toLocaleDateString()} 
                />
              </View>
            ))
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop :40
  },
  contentContainer: {
    paddingBottom: 100,
  },
  profileWrapper: {
    alignItems: "center",
    margin: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noQuestionsText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default MyQuestionsScreen;
