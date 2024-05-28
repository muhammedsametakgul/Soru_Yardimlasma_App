import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from "../utils/Colors";

const CustomHeader = ({ title }) => (
  <LinearGradient
    colors={['#FFA07A', '#FF6347']} // Örnek renkler
    start={[0, 0]}
    end={[1, 0]}
    style={styles.header}>
    <View style={styles.headerContent}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingTop: 30,
    paddingBottom: 15,
    paddingHorizontal: 16,
  },
  headerContent: {
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.textColor,
  },
});

export default CustomHeader;
