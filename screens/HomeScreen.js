import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import ProfileBox from "../components/ProfileBox";
import { readQuestions } from "../service/readQuestions";
import { filterQuestion } from "../service/filterQuestion";
import { Colors } from "../utils/Colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { lessons } from "../utils/lessons";
import { topics } from "../utils/topics";

const HomeScreen = () => {
  const [questions, setQuestions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [motivationText, setMotivationText] = useState("");
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedLessonModal, setSelectedLessonModal] = useState("");
  const [selectedTopicModal, setSelectedTopicModal] = useState("");
  const [isLessonModalVisible, setIsLessonModalVisible] = useState(false);
  const [isTopicModalVisible, setIsTopicModalVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const fetchedQuestions = await readQuestions();
      setQuestions(fetchedQuestions);
      setFilteredQuestions(fetchedQuestions);
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

  const onSelectLessonAndTopic = (lesson, topic) => {
    setSelectedLessonModal(lesson);
    setSelectedTopicModal(topic);
  };

  const handleClearAllFilters = () => {
    setSelectedLessonModal("");
    setSelectedTopicModal("");
    setFilteredQuestions(questions);
    setIsFilterModalVisible(false);
  };

  const handleApplyFilters = async () => {
    const filtered = await filterQuestion(
      selectedLessonModal,
      selectedTopicModal
    );
    setFilteredQuestions(filtered);
  };

  const handleLessonPress = () => {
    setIsLessonModalVisible(true);
  };

  const handleLessonSelect = (lesson) => {
    setSelectedLessonModal(lesson);
    setIsLessonModalVisible(false);
    setSelectedTopicModal("");
    onSelectLessonAndTopic(lesson, "");
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopicModal(topic);
    setIsTopicModalVisible(false);
    onSelectLessonAndTopic(selectedLessonModal, topic);
  };

  const handleTopicPress = () => {
    if (selectedLessonModal) {
      setIsTopicModalVisible(true);
    }
  };

  const handleClearFilters = () => {
    setSelectedLessonModal("");
    setSelectedTopicModal("");
    onSelectLessonAndTopic("", "");
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
          {filteredQuestions.map((question, index) => (
            <View key={index} style={styles.profileWrapper}>
              <ProfileBox
                name={question.title}
                description={question.question}
                imageSource={{ uri: question.imageUrl }}
                questionId={question.id}
                date={question.createdAt.toDate().toLocaleDateString()}
                lesson={question.lesson}
                subject={question.subject}
              />
            </View>
          ))}
        </ScrollView>
      )}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setIsFilterModalVisible(true)}
      >
        <MaterialCommunityIcons name="filter" size={28} color="#fff" />
      </TouchableOpacity>
      <Modal
        visible={isFilterModalVisible}
        onRequestClose={() => setIsFilterModalVisible(false)}
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.listBox}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleLessonPress}
              >
                <Text style={styles.buttonText}>
                  Ders : {selectedLessonModal || "Ders Seçiniz"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={handleTopicPress}
              >
                <Text style={styles.buttonText}>
                  Konu : {selectedTopicModal || "Konu Seçiniz"}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClearFilters}
            >
              <Text style={styles.clearButtonText}>Filtreleri Temizle</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.filterButton}
              onPress={handleApplyFilters}
            >
              <Text style={styles.filterButtonText}>Filtrele</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isLessonModalVisible}
        onRequestClose={() => setIsLessonModalVisible(false)}
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <FlatList
              data={lessons}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleLessonSelect(item.name)}
                >
                  <Text style={styles.modalItem}>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
      </Modal>

      <Modal
        visible={isTopicModalVisible}
        onRequestClose={() => setIsTopicModalVisible(false)}
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <FlatList
              data={topics[selectedLessonModal]}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleTopicSelect(item)}>
                  <Text style={styles.modalItem}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 10,
  },
  contentContainer: {
    paddingBottom: 40,
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
  floatingButton: {
    position: "absolute",
    right: 20,
    bottom: "10%",
    backgroundColor: Colors.buttonColor,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: "80%",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "80%",
    maxHeight: "80%",
    padding: 20,
    justifyContent: "center",
  },
  modalItem: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    textAlign: "center",
  },
  listBox: {
    backgroundColor: Colors.modalBackgroungColor,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    marginBottom: 10,
    backgroundColor: Colors.listBoxColor,
    padding: 8,
    borderRadius: 5,
    borderColor: "#000",
    borderWidth: 1,
  },
  buttonText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
  },
  clearButton: {
    backgroundColor: Colors.buttonDefault,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  clearButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  filterButton: {
    backgroundColor: Colors.buttonDefault,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  filterButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default HomeScreen;
