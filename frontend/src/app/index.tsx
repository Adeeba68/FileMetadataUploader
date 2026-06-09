import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";

import axios from "axios";
import * as DocumentPicker from "expo-document-picker";

import FileCard from "../../components/FileCard";

const SERVER = "http://192.168.100.13:5000";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function Home() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFiles = async () => {
    try {
      const response = await axios.get(
        `${SERVER}/files`
      );

      setFiles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const uploadFile = async () => {
    try {
      const result =
        await DocumentPicker.getDocumentAsync({});

      if (result.canceled) return;

      const file = result.assets[0];

      if (file.size > MAX_FILE_SIZE) {
        Alert.alert(
          "File Too Large",
          "Maximum allowed size is 10 MB"
        );
        return;
      }

      setLoading(true);

      await axios.post(`${SERVER}/upload`, {
        name: file.name,
        size: file.size,
        type: file.mimeType || "Unknown",
      });

      Alert.alert(
        "Success",
        "Metadata uploaded successfully"
      );

      fetchFiles();
    } catch (error) {
      Alert.alert(
        "Error",
        "Upload failed"
      );

      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        
        File Metadata Uploader
      </Text>

      <Text style={styles.subtitle}>
        Upload and manage file metadata
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={uploadFile}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>
          📁 Select File
        </Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator
          size="large"
          style={{ marginBottom: 20 }}
        />
      )}

      <Text style={styles.sectionTitle}>
        Uploaded Files ({files.length})
      </Text>

      {!loading && files.length === 0 && (
        <Text style={styles.empty}>
          No files uploaded yet
        </Text>
      )}

      <FlatList
        data={files}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({ item }) => (
          <FileCard file={item} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f6fb",
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    color: "#111827",
  },

  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: 8,
    marginBottom: 25,
    fontSize: 15,
  },

  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 25,

    shadowColor: "#2563eb",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,

    elevation: 5,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 17,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
    color: "#111827",
  },

  empty: {
    textAlign: "center",
    marginTop: 30,
    color: "#6b7280",
    fontSize: 16,
  },
});