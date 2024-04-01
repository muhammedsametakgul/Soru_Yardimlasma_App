import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import ProfileBox from '../components/ProfileBox';
import { readQuestions } from "../service/readQuestions";

const HomeScreen = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedQuestions = await readQuestions();
      setQuestions(fetchedQuestions);
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {questions.map((question, index) => (
          <View key={index} style={styles.profileWrapper}>
            <ProfileBox
              name={question.title}
              description={question.question}
              imageSource={question.imageSource}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100, 
  },
  profileWrapper: {
    alignItems: 'center', 
    margin: 10, 
  },
});

export default HomeScreen;
