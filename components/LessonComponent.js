import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { Colors } from "../utils/Colors";

const LessonComponent = ({
  onSelectLessonAndTopic,
}) => {
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
                Ders : {selectedLesson || "Ders Seçiniz"}
              </Text>
            </TouchableOpacity>
      
            <TouchableOpacity style={styles.button} onPress={handleTopicPress}>
              <Text style={styles.buttonText}>
                Konu : {selectedTopic || "Konu Seçiniz"}
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
                  <TouchableOpacity onPress={() => handleLessonSelect(item.name)}>
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
                data={topics[selectedLesson]}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleTopicSelect(item)}>
                    <Text style={styles.modalItem}>{item}</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item}
              />
            </View>
          </Modal>
        </View>
      );
};

const styles = StyleSheet.create({
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
    marginTop:40,
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
  
});

export default LessonComponent;
