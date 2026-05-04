import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function DashboardScreen({ navigation, route }) {
  const username = route?.params?.username || "User";

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>

        {/* App Title */}
        <Text style={styles.appTitle}>Food Allergy Alert</Text>

        {/* Greeting */}
        <Text style={styles.helloText}>Hello,</Text>
        <Text style={styles.usernameText}>{username}</Text>

        {/* Main Card */}
        <View style={styles.card}>

          {/* Scan Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Scan", { username })}
          >
            <Ionicons name="camera-outline" size={22} color="#fff" />
            <Text style={styles.buttonText}>Scan Product</Text>
          </TouchableOpacity>

          {/* Grid Options */}
          <View style={styles.grid}>

            <TouchableOpacity
              style={styles.gridItem}
              onPress={() => navigation.navigate("Allergens", { username })}
            >
              <Ionicons name="list-outline" size={24} color="#1E88E5" />
              <Text style={styles.gridText}>My Allergens</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.gridItem}
              onPress={() => navigation.navigate("History", { username })}
            >
              <Ionicons name="time-outline" size={24} color="#1E88E5" />
              <Text style={styles.gridText}>History</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.gridItem}
              onPress={() => navigation.navigate("ViewProfile", { username })}
            >
              <Ionicons name="person-outline" size={24} color="#1E88E5" />
              <Text style={styles.gridText}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.gridItem}
              onPress={() => navigation.navigate("Settings", { username })}
            >
              <Ionicons name="settings-outline" size={24} color="#1E88E5" />
              <Text style={styles.gridText}>Settings</Text>
            </TouchableOpacity>

          </View>
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
    marginBottom: 10,
  },

  helloText: {
    fontSize: 14,
    color: "#5f8fb3",
  },

  usernameText: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1E88E5",
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

  button: {
    backgroundColor: "#1E88E5",
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  gridItem: {
    width: "47%",
    backgroundColor: "#F2F9FF",
    borderRadius: 12,
    padding: 18,
    marginBottom: 15,
    alignItems: "center",
  },

  gridText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
});
