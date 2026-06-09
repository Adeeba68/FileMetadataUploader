import React, {
  useEffect,
  useState,
  useRef,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Animated,
} from "react-native";

import axios from "axios";

import * as DocumentPicker
from "expo-document-picker";

import FileCard from "./components/FileCard";

const SERVER =
  "http://YOUR_IP:5000";

const MAX_FILE_SIZE =
  10 * 1024 * 1024;

export default function App() {
  const [files, setFiles] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const scale =
    useRef(
      new Animated.Value(1)
    ).current;

  const fetchFiles = async () => {
    try {
      const response =
        await axios.get(
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

  const handleUpload =
    async () => {
      try {
        const result =
          await DocumentPicker.getDocumentAsync(
            {}
          );

        if (result.canceled)
          return;

        const file =
          result.assets[0];

        if (
          file.size >
          MAX_FILE_SIZE
        ) {
          Alert.alert(
            "File Too Large",
            "Maximum file size is 10 MB"
          );

          return;
        }

        setLoading(true);

        await axios.post(
          `${SERVER}/upload`,
          {
            name: file.name,
            size: file.size,
            type:
              file.mimeType ||
              "Unknown",
          }
        );

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
      } finally {
        setLoading(false);
      }
    };

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        File Metadata Uploader
      </Text>

      <Animated.View
        style={{
          transform: [
            { scale },
          ],
        }}
      >
        <TouchableOpacity
          onPress={handleUpload}
          onPressIn={pressIn}
          onPressOut={pressOut}
          style={styles.button}
        >
          <Text
            style={
              styles.buttonText
            }
          >
            Upload File
          </Text>
        </TouchableOpacity>
      </Animated.View>

      {loading && (
        <ActivityIndicator
          size="large"
        />
      )}

      {!loading &&
        files.length === 0 && (
          <Text
            style={
              styles.empty
            }
          >
            No files uploaded yet
          </Text>
        )}

      <FlatList
        data={files}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={({
          item,
        }) => (
          <FileCard
            file={item}
          />
        )}
      />
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor:
        "#f5f7fb",
      paddingTop: 60,
    },

    title: {
      fontSize: 28,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 25,
    },

    button: {
      backgroundColor:
        "#2563eb",
      padding: 16,
      borderRadius: 12,
      marginBottom: 20,
    },

    buttonText: {
      color: "white",
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 16,
    },

    empty: {
      textAlign: "center",
      marginTop: 30,
      fontSize: 16,
    },
  });