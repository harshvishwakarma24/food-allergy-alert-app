import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { getUserProfile } from "../api/authApi";
import { getAllergens } from "../api/allergenApi";
import { COLORS } from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen({ route }) {
  const username = route?.params?.username;

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [allergens, setAllergens] = useState([]);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const profileRes = await getUserProfile(username);
      const allergenRes = await getAllergens(username);

      setProfile(profileRes);
      setAllergens(allergenRes.allergens || []);
    } catch (error) {
      console.log("PROFILE ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={42} color={COLORS.primary} />
        </View>

        <Text style={styles.username}>{profile.username}</Text>
        <Text style={styles.email}>{profile.email}</Text>
      </View>

      {/* PERSONAL INFO CARD */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Personal Information</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Username</Text>
          <Text style={styles.value}>{profile.username}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{profile.email}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Age</Text>
          <Text style={styles.value}>
            {profile.age ? profile.age : "Not set"}
          </Text>
        </View>
      </View>

      {/* ALLERGENS CARD */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>My Allergens</Text>

        {allergens.length === 0 ? (
          <Text style={styles.emptyText}>No allergens added</Text>
        ) : (
          <View style={styles.allergenContainer}>
            {allergens.map((item, index) => (
              <View key={index} style={styles.allergenChip}>
                <Text style={styles.allergenText}>{item}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF6FF",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  /* HEADER */
  header: {
    backgroundColor: "#1E88E5",
    paddingVertical: 40,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },

  avatar: {
    height: 90,
    width: 90,
    borderRadius: 45,
    backgroundColor: "#EAF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  username: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.white,
  },

  email: {
    fontSize: 14,
    color: "#D6EBFF",
    marginTop: 2,
  },

  /* CARDS */
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 20,
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.primary,
    marginBottom: 12,
  },

  infoRow: {
    marginBottom: 12,
  },

  label: {
    fontSize: 13,
    color: "#777",
  },

  value: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.darkGrey,
    marginTop: 2,
  },

  emptyText: {
    color: "#888",
    fontSize: 14,
  },

  allergenContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  allergenChip: {
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },

  allergenText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "500",
  },
});
