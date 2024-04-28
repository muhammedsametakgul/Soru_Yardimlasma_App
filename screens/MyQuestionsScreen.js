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
import ProfileBox from "../components/ProfileBox";
import getQuestionsByUserId from "../service/getQuestionsByUserId";


const MyQuestionsScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userId = "3SU75NuiJAOJyxS7EJfRc8DVSm72";

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
          {questions.map((question, index) => (
            <View key={index} style={styles.profileWrapper}>
              <ProfileBox
                name={question.title}
                description={question.question}
                imageSource={{ uri: question.imageUrl }}
                questionId={question.id}
                date={question.createdAt.toDate().toLocaleDateString()} 
              />
            </View>
          ))}
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
});

export default MyQuestionsScreen;
