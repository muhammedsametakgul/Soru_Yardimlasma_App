import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, RefreshControl, ActivityIndicator } from 'react-native';
import ProfileBox from '../components/ProfileBox';
import { readQuestions } from "../service/readQuestions";

const HomeScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true); // Yeni state ekledik: loading

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const fetchedQuestions = await readQuestions();
      setQuestions(fetchedQuestions);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Hata durumunda gerekirse kullanıcıya bir mesaj gösterebilirsiniz
    } finally {
      setLoading(false); // Veri yüklendikten sonra loading durumunu false olarak ayarlayın
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <SafeAreaView style={styles.screen}>
      {loading ? ( // loading durumuna göre ActivityIndicator veya içeriği görüntüle
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          {questions.map((question, index) => (
            <View key={index} style={styles.profileWrapper}>
              <ProfileBox
                name={question.title}
                description={question.question}
                imageSource={{ uri: question.imageUrl }} 
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
  },
  contentContainer: {
    paddingBottom: 100, 
  },
  profileWrapper: {
    alignItems: 'center', 
    margin: 10, 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
