import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../theme/colors";
import { saveAllergens, getAllergens } from "../api/allergenApi";

const DEFAULT_ALLERGENS = [
  "milk",
  "egg",
  "wheat",
  "fish",
  "shellfish",
  "soy",
  "peanuts",
  "nuts",
];

export default function MyAllergensScreen({ route }) {
  const username = route?.params?.username;

  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [customAllergen, setCustomAllergen] = useState("");

  useEffect(() => {
    if (username) {
      fetchUserAllergens();
    }
  }, []);

  const fetchUserAllergens = async () => {
    try {
      const response = await getAllergens(username);
      const saved = response?.allergens || [];
      setSelectedAllergens(saved.map(a => a.toLowerCase()));
    } catch (error) {
      console.log("FETCH ERROR:", error);
    }
  };

  const toggleAllergen = (item) => {
    if (selectedAllergens.includes(item)) {
      setSelectedAllergens(
        selectedAllergens.filter((a) => a !== item)
      );
    } else {
      setSelectedAllergens([...selectedAllergens, item]);
    }
  };

  const addCustomAllergen = () => {
    const value = customAllergen.trim().toLowerCase();

    if (!value) {
      Alert.alert("Error", "Please enter a valid allergen");
      return;
    }

    if (!selectedAllergens.includes(value)) {
      setSelectedAllergens([...selectedAllergens, value]);
    }

    setCustomAllergen("");
  };

  const handleSave = async () => {
    try {
      await saveAllergens(username, selectedAllergens);
      Alert.alert("Success", "Allergens saved successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to save allergens");
    }
  };

  const allAllergens = [
    ...new Set([...DEFAULT_ALLERGENS, ...selectedAllergens]),
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>

        {/* Header */}
        <Text style={styles.appTitle}>Manage Your Allergens</Text>
        <Text style={styles.subTitle}></Text>

        {/* Card */}
        <View style={styles.card}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {allAllergens.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.allergenItem,
                  selectedAllergens.includes(item) && styles.selected,
                ]}
                onPress={() => toggleAllergen(item)}
              >
                <Text style={styles.allergenText}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}

            <TextInput
              style={styles.input}
              placeholder="Add custom allergen (e.g. sugar)"
              placeholderTextColor="#9bbcd1"
              value={customAllergen}
              onChangeText={setCustomAllergen}
            />

            <TouchableOpacity
              style={styles.addButton}
              onPress={addCustomAllergen}
            >
              <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Text style={styles.saveText}>Save Allergens</Text>
            </TouchableOpacity>

          </ScrollView>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF6FF",
    padding: 20,
  },

  appTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1E88E5",
    textAlign: "center",
    marginBottom: 5,
  },

  subTitle: {
    fontSize: 14,
    color: "#5f8fb3",
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },

  allergenItem: {
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#cce4f7",
    marginBottom: 12,
    backgroundColor: "#F2F9FF",
  },

  selected: {
    backgroundColor: "#1E88E520",
    borderColor: "#1E88E5",
  },

  allergenText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },

  input: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#cce4f7",
    borderRadius: 12,
    padding: 14,
    backgroundColor: "#F2F9FF",
  },

  addButton: {
    marginTop: 10,
    backgroundColor: "#1E88E5",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  addText: {
    color: "#fff",
    fontWeight: "600",
  },

  saveButton: {
    marginTop: 25,
    backgroundColor: "#1E88E5",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  saveText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
