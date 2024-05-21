import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { Colors } from "../utils/Colors";

const LessonComponent = ({ onSelectLessonAndTopic }) => {
  const [selectedLesson, setSelectedLesson] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [isLessonModalVisible, setIsLessonModalVisible] = useState(false);
  const [isTopicModalVisible, setIsTopicModalVisible] = useState(false);

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

  const handleLessonPress = () => {
    setIsLessonModalVisible(true);
  };

  const handleLessonSelect = (lesson) => {
    setSelectedLesson(lesson);
    setIsLessonModalVisible(false);
    setSelectedTopic("");
  };

  const handleTopicPress = () => {
    if (selectedLesson) {
      setIsTopicModalVisible(true);
    }
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setIsTopicModalVisible(false);
    onSelectLessonAndTopic(selectedLesson, topic);
  };

  return (
    <View style={styles.container}>
      <View style={styles.listBox}>
        <TouchableOpacity style={styles.button} onPress={handleLessonPress}>
          <Text style={styles.buttonText}>
            Ders: {selectedLesson || "Ders Seçiniz"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleTopicPress}>
          <Text style={styles.buttonText}>
            Konu: {selectedTopic || "Konu Seçiniz"}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isLessonModalVisible}
        onRequestClose={() => setIsLessonModalVisible(false)}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <FlatList
              data={lessons}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleLessonSelect(item.name)}
                >
                  <Text style={styles.modalItemText}>{item.name}</Text>
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
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <FlatList
              data={topics[selectedLesson]}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleTopicSelect(item)}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  button: {
    marginBottom: 10,
    backgroundColor: Colors.listBoxColor,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
    width: 300,
    height: 40,
    borderRadius: 10,
    textAlign: "left",
  },
  buttonText: {
    color:Colors.listBoxTextColor,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: "80%",
    elevation: 5,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalItemText: {
    fontSize: 18,
    textAlign: "center",
    color: Colors.listBoxTextColor,
    textAlign: "left",
  },
  listBox: {
    borderRadius: 10,
  },
});

export default LessonComponent;
