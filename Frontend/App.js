import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ThemeProvider } from "./screens/ThemeContext";

import DashboardScreen from "./screens/DashboardScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import AllergensScreen from "./screens/AllergensScreen"
import HistoryScreen from "./screens/HistoryScreen"
import ScanScreen from "./screens/ScanScreen"
import ViewProfileScreen from "./screens/ViewProfileScreen"
import SplashScreen from "./screens/SplashScreen"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import ScanResultScreen from "./screens/ScanResultScreen"

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splasg" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Allergens" component={AllergensScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
          <Stack.Screen name="Scan" component={ScanScreen} />
           <Stack.Screen name="ViewProfile" component={ViewProfileScreen} />
           <Stack.Screen name="ScanResult" component={ScanResultScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
