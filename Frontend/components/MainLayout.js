import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import { ThemeContext } from "../screens/ThemeContext";

export default function MainLayout({ children, title, navigation }) {
  const { colors } = useContext(ThemeContext);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.primary }]}
      edges={["top"]}
    >
      {/* HEADER */}
      <AppHeader title={title} navigation={navigation} />

      {/* CONTENT */}
      <View
        style={[
          styles.content,
          { backgroundColor: colors.background },
        ]}
      >
        {children}
      </View>

      {/* FOOTER (if you use it) */}
      {/* <AppFooter /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  content: {
    flex: 1,
    padding: 20,
  },
});
