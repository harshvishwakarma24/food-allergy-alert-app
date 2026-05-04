import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme/colors";

export default function AppFooter({ navigation }) {
  return (
    <View style={styles.footer}>

      <Ionicons
        name="home-outline"
        size={24}
        color={COLORS.primary}
        onPress={() => navigation.navigate("Dashboard")}
      />

      <Ionicons
        name="time-outline"
        size={24}
        color={COLORS.primary}
        onPress={() => navigation.navigate("History")}
      />

      <Ionicons
        name="person-outline"
        size={24}
        color={COLORS.primary}
        onPress={() => navigation.navigate("Profile")}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    height: 60,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: COLORS.lightGrey,
  },
});
