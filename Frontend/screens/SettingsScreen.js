import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { clearHistory } from "../api/historyApi";

export default function SettingsScreen({ navigation, route }) {
  const username = route?.params?.username;

  // 🔥 CLEAR HISTORY
  const handleClearHistory = () => {
    if (!username) {
      Alert.alert("Error", "User session not found. Please login again.");
      return;
    }

    Alert.alert(
      "Clear Scan History",
      "This action will permanently delete all your scan records. Do you want to continue?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            try {
              await clearHistory(username);
              Alert.alert("Success", "History cleared successfully", [
                {
                  text: "OK",
                  onPress: () =>
                    navigation.replace("Dashboard", { username }),
                },
              ]);
            } catch (error) {
              Alert.alert("Error", "Unable to clear history.");
            }
          },
        },
      ]
    );
  };

  // 🔐 PRIVACY POLICY
  const showPrivacyPolicy = () => {
    Alert.alert(
      "Privacy Policy",
      "Food Allergy Alert respects your privacy.\n\n" +
        "• Your data is securely stored.\n" +
        "• Scan history is used only for safety tracking.\n" +
        "• We never share your information.\n\n" +
        "Your safety is our priority.",
      [{ text: "OK" }]
    );
  };

  // 🚪 LOGOUT
  const logout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => navigation.replace("Login"),
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>

        {/* Header – Same Style as Dashboard */}
        <Text style={styles.appTitle}>Settings</Text>
        <Text style={styles.subTitle}></Text>

        {/* Main Card */}
        <View style={styles.card}>

          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate("Profile", { username })
            }
          >
            <Ionicons name="person-outline" size={22} color="#1E88E5" />
            <Text style={styles.itemText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={handleClearHistory}
          >
            <Ionicons name="trash-outline" size={22} color="#1E88E5" />
            <Text style={styles.itemText}>Clear Scan History</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={showPrivacyPolicy}
          >
            <Ionicons name="shield-checkmark-outline" size={22} color="#1E88E5" />
            <Text style={styles.itemText}>Privacy Policy</Text>
          </TouchableOpacity>

        </View>

        {/* Logout Button – Same Dashboard Button Style */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

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

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  itemText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  logoutBtn: {
    marginTop: 25,
    backgroundColor: "#1E88E5",
    paddingVertical: 14,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
