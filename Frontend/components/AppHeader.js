import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";

export default function AppHeader({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "600",
  },
});
