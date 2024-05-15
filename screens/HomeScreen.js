import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  ActivityIndicator,
  Image,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import ProfileBox from "../components/ProfileBox";
import { readQuestions } from "../service/readQuestions";
import { filterQuestion } from "../service/filterQuestion";
import { Colors } from "../utils/Colors";

const motivationQuotes = [
  "Hedeflerinize bir adım daha...",
  "Her gün küçük bir ilerleme, büyük bir başarıya yol açar.",
  "Başarı için en önemli adım, cesaretli bir adım atmaktır.",
  "Hayallerinizi kovalayın, başarıya doğru adım adım ilerleyin.",
  "Bugün için en iyisini yapın, yarın için en iyisini bekleyin.",
];
const lessons = [
  { id: 1, name: "Matematik" },
  { id: 2, name: "Türkçe" },
  { id: 3, name: "Tarih" },
];
const topics = {
  Matematik: ["Lineer cebir", "Geometri", "Birinci Dereceden Denklemler"],
  Türkçe: ["Ünlü Düşmesi", "Anlatım Bozuklukları", "Paragraf"],
  Tarih: ["Osmanlı Kuruluş", "Osmanlı Yükseliş", "Osmanlı Çöküş"],
};
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
    setRandomMotivation();
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

  const setRandomMotivation = () => {
    const randomIndex = Math.floor(Math.random() * motivationQuotes.length);
    setMotivationText(motivationQuotes[randomIndex]);
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
      <View style={styles.header}>
        <Image
          source={require("../assets/images/YKSLogoV2.png")}
          style={styles.logo}
        />
        <Text style={styles.headerText}>{motivationText}</Text>
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
          {filteredQuestions.map((question, index) => (
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
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setIsFilterModalVisible(true)}
      >
        <Text style={styles.floatingButtonText}>+</Text>
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

            <Modal
              visible={isLessonModalVisible}
              onRequestClose={() => setIsLessonModalVisible(false)}
            >
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
            </Modal>

            <Modal
              visible={isTopicModalVisible}
              onRequestClose={() => setIsTopicModalVisible(false)}
            >
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
            </Modal>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 10,
    flex: 1,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
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
  floatingButton: {
    position: "absolute",
    right: 20,
    bottom: "10%",
    backgroundColor: Colors.buttonLogin,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 24,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    height: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtons: {
    flexDirection: "row",
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: Colors.buttonLogin,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  container: {
    padding: 5,
  },
  button: {
    marginBottom: 10,
    backgroundColor: Colors.listBoxColor,
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    backgroundColor: Colors.modalBackgroungColor,
  },
  modalItem: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    textAlign: "center",
  },
  listBox: {
    backgroundColor: Colors.modalBackgroungColor,
    borderRadius: 10,
    marginBottom: 20,
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
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  
});

export default HomeScreen;
