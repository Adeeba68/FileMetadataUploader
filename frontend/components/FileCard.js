import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { formatSize } from "../utils/formatSize";

export default function FileCard({ file }) {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>📄</Text>

      <Text style={styles.name}>
        {file.name}
      </Text>

      <Text style={styles.type}>
        {file.type}
      </Text>

      <Text style={styles.size}>
        {formatSize(file.size)}
      </Text>

      <Text style={styles.date}>
        Uploaded: {new Date(file.uploadedAt).toLocaleString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 4,
  },

  icon: {
    fontSize: 28,
    marginBottom: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 5,
  },

  type: {
    color: "#6b7280",
    marginBottom: 5,
  },

  size: {
    color: "#2563eb",
    fontWeight: "600",
    marginBottom: 5,
  },

  date: {
    color: "#4b5563",
  },
});
