import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getProductByBarcode } from "../api/productApi";
import { getAllergens } from "../api/allergenApi";
import { saveHistory } from "../api/historyApi";

export default function ScanResultScreen({ route, navigation }) {
  const { barcode, username } = route.params;

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [matchedAllergens, setMatchedAllergens] = useState([]);

  useEffect(() => {
    processScan();
  }, []);

  const processScan = async () => {
    try {
      const productResponse = await getProductByBarcode(barcode);

      if (!productResponse || !productResponse.product) {
        Alert.alert("Product not found");
        navigation.goBack();
        return;
      }

      const productData = productResponse.product;

      const ingredients =
        (
          productData.ingredients_text ||
          productData.ingredients_text_en ||
          ""
        ).toLowerCase();

      const apiAllergens =
        productData.allergens_tags?.map(tag =>
          tag.replace("en:", "").toLowerCase()
        ) || [];

      const allergenResponse = await getAllergens(username);
      const userAllergens =
        allergenResponse?.allergens?.map(a =>
          a.toLowerCase()
        ) || [];

      const SUGAR_KEYWORDS = [
        "sugar",
        "sugars",
        "glucose",
        "fructose",
        "dextrose",
        "maltose",
        "sucrose",
        "corn syrup",
        "glucose syrup",
        "high fructose corn syrup",
      ];

      const matches = userAllergens.filter(allergen => {
        if (allergen === "sugar") {
          return SUGAR_KEYWORDS.some(keyword =>
            ingredients.includes(keyword)
          );
        }

        const regex = new RegExp(`\\b${allergen}s?\\b`, "i");

        return (
          regex.test(ingredients) ||
          apiAllergens.some(tag =>
            tag.includes(allergen)
          )
        );
      });

      const resultText =
        matches.length === 0
          ? "SAFE"
          : `CONTAINS ${matches.join(", ")}`;

      const productName =
        productData.product_name ||
        productData.product_name_en ||
        productData.generic_name ||
        "Unknown Product";

      await saveHistory({
        username,
        product_name: productName,
        barcode,
        result: resultText,
      });

      setProduct({
        ...productData,
        product_name: productName,
      });

      setMatchedAllergens(matches);

    } catch (error) {
      console.log("SCAN RESULT ERROR:", error);
      Alert.alert("Error", "Failed to process scan");
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

  const isSafe = matchedAllergens.length === 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Header */}
        <Text style={styles.appTitle}>Scan Result</Text>
        <Text style={styles.subTitle}></Text>

        {/* Result Card */}
        <View style={styles.card}>

          <Text style={styles.productName}>
            {product?.product_name || "Unknown Product"}
          </Text>

          {isSafe ? (
            <Text style={styles.safeText}>✅ This product is SAFE</Text>
          ) : (
            <Text style={styles.dangerText}>
              ⚠️ Contains {matchedAllergens.join(", ")}
            </Text>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.replace("Dashboard", { username })
            }
          >
            <Text style={styles.buttonText}>Back to Dashboard</Text>
          </TouchableOpacity>

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
    alignItems: "center",
  },

  productName: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },

  safeText: {
    color: "green",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },

  dangerText: {
    color: "#E53935",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },

  button: {
    backgroundColor: "#1E88E5",
    paddingVertical: 14,
    borderRadius: 12,
    width: "100%",
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
