import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { getUserProfile, updateUserProfile } from "../api/authApi";

export default function ProfileScreen({ navigation, route }) {
  const usernameParam = route?.params?.username;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getUserProfile(usernameParam);
      setUsername(data.username);
      setEmail(data.email);
      setAge(data.age ? data.age.toString() : "");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    if (!username) {
      Alert.alert("Error", "Username is required");
      return;
    }

    try {
      setLoading(true);

      const response = await updateUserProfile(usernameParam, {
        username,
        age,
      });

      Alert.alert("Success", "Profile Updated Successfully!");

      navigation.replace("Dashboard", {
        username: response.username,
      });

    } catch (error) {
      Alert.alert("Error", "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>

        {/* Header */}
        <Text style={styles.appTitle}>Edit Profile</Text>
        <Text style={styles.subTitle}></Text>

        {/* Card */}
        <View style={styles.card}>

          {/* Avatar */}
          <View style={styles.imageWrapper}>
            <Ionicons name="person" size={40} color="#fff" />
          </View>

          <Text style={styles.helperText}>
            Update your account information
          </Text>

          {/* Username */}
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#9bbcd1"
            value={username}
            onChangeText={setUsername}
          />

          {/* Locked Email */}
          <TextInput
            style={[styles.input, styles.lockedInput]}
            value={email}
            editable={false}
          />

          {/* Age */}
          <TextInput
            style={styles.input}
            placeholder="Age"
            placeholderTextColor="#9bbcd1"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />

          {/* Save Button */}
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Save Profile</Text>
            )}
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF6FF",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  appTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1E88E5",
    marginBottom: 5,
  },

  subTitle: {
    fontSize: 16,
    color: "#5f8fb3",
    marginBottom: 25,
  },

  card: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 25,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },

  imageWrapper: {
    alignSelf: "center",
    height: 110,
    width: 110,
    borderRadius: 55,
    backgroundColor: "#1E88E5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  helperText: {
    textAlign: "center",
    color: "#5f8fb3",
    marginBottom: 20,
    fontSize: 14,
  },

  input: {
    backgroundColor: "#F2F9FF",
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#cce4f7",
  },

  lockedInput: {
    backgroundColor: "#f2f2f2",
    color: "#888",
  },

  button: {
    backgroundColor: "#1E88E5",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
