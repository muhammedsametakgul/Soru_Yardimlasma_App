import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, RefreshControl, ActivityIndicator, TextInput, TouchableOpacity, Image, Text } from 'react-native';
import CommentBox from '../components/CommentBox';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createComment } from '../service/CreateComments';

const CommentScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [imageSource, setImageSource] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const fakeQuestions = [
      {
        title: 'Question 1',
        question: 'Description 1',
        imageUrl: 'https://via.placeholder.com/200',
      },
      {
        title: 'Question 2',
        question: 'Description 2',
        imageUrl: 'https://via.placeholder.com/200',
      },
      {
        title: 'Question 3',
        question: 'Description 3',
        imageUrl: 'https://via.placeholder.com/200',
      },
    ];

    setQuestions(fakeQuestions);

    setLoading(false);
    setRefreshing(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleAddImage = () => {
    console.log('Add Image');
  };

  const handleCommentSubmit = async () => {
    console.log('Submit Comment:', commentText);
    try {
        const addedCommentRef = await createComment('2o0UvBvMV0AmZrq4xaOK', commentText, null); 
        console.log("Added comment:", addedCommentRef);
        
        setCommentText('');
      } catch (error) {
        console.error("Error creating comment:", error);
      }
  };

  return (
    <SafeAreaView style={styles.screen}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          >
            {questions.map((question, index) => (
              <View key={index} style={styles.profileWrapper}>
                <CommentBox
                  name={question.title}
                  description={question.question}
                  imageSource={{ uri: question.imageUrl }}
                />
              </View>
            ))}
          </ScrollView>
          <View style={styles.fixedBottom}>
            <View style={styles.commentContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="Yorumunuzu buraya yazın..."
                onChangeText={(commentText) => setCommentText(commentText)}
                multiline={true}
                numberOfLines={4} 
                textAlignVertical="top"
              />
              <TouchableOpacity style={styles.addImageButton} onPress={handleAddImage}>
                <Icon name="camera" size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={handleCommentSubmit}>
                <Text style={styles.submitButtonText}>Gönder</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop :50
  },
  contentContainer: {
    paddingBottom: 150, 
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
  fixedBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
    backgroundColor: '#FFFFFF',
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
    maxHeight: 120, 
  },
  addImageButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default CommentScreen;
