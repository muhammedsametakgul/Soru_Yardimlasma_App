import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
  Image
} from "react-native";
import ProfileBox from "../components/ProfileBox";
import { readQuestions } from "../service/readQuestions";

const HomeScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const fetchedQuestions = await readQuestions();
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
      <View style={styles.header}>
        <Image source={require('../assets/images/YKSLogoV2.png')} style={styles.logo} />
        <Text style={styles.headerText}>Hedeflerinize bir adım daha...</Text>
      </View>
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
    marginTop: 50
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start', 
    backgroundColor:'#fff',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10, 
    flex: 1, 
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
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

export default HomeScreen;
