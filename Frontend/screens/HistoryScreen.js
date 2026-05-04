import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getHistory } from "../api/historyApi";
import { useFocusEffect } from "@react-navigation/native";

export default function HistoryScreen({ route }) {
  const username = route?.params?.username;

  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

  useFocusEffect(
    useCallback(() => {
      if (username) {
        fetchHistory();
      }
    }, [username])
  );

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const data = await getHistory(username);
      setHistory(data);
    } catch (error) {
      console.log("HISTORY FETCH ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#1E88E5" />
        </View>
      </SafeAreaView>
    );
  }

  if (history.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <Text style={styles.emptyTitle}>No Scan History</Text>
          <Text style={styles.emptySub}>
            Your scanned products will appear here
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={styles.container}>

        {/* Title BELOW NOTCH */}
        <Text style={styles.headerTitle}>Your Scan History</Text>

        {/* Card Wrapper */}
        <View style={styles.cardContainer}>
          <FlatList
            data={history}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.name}>
                  {item.product_name}
                </Text>

                <Text
                  style={[
                    styles.result,
                    item.result.includes("SAFE")
                      ? styles.safe
                      : styles.danger,
                  ]}
                >
                  {item.result}
                </Text>

                <Text style={styles.date}>
                  {new Date(item.scanned_at).toLocaleString()}
                </Text>
              </View>
            )}
          />
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#EAF6FF",
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1E88E5",
    textAlign: "center",
    marginBottom: 20,
  },

  cardContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 15,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },

  card: {
    backgroundColor: "#F2F9FF",
    padding: 15,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#cce4f7",
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },

  result: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "600",
  },

  safe: {
    color: "green",
  },

  danger: {
    color: "red",
  },

  date: {
    marginTop: 6,
    fontSize: 12,
    color: "#777",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E88E5",
  },

  emptySub: {
    marginTop: 6,
    fontSize: 14,
    color: "#5f8fb3",
  },
});
