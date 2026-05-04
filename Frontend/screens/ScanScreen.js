import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function ScanScreen({ navigation, route }) {
  const username = route?.params?.username;

  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  //  Permission loading
  if (!permission) {
    return (
      <View style={styles.center}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }
  //  Permission not granted
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text onPress={requestPermission} style={{ color: "blue" }}>
          Tap to allow camera permission
        </Text>
      </View>
    );
  }

  const handleBarcodeScanned = ({ data }) => {
    if (scanned) return;

    setScanned(true);

    console.log("SCANNED BARCODE:", data); // IMPORTANT LOG

    //  Navigate immediately (no Alert)
    navigation.replace("ScanResult", {
      barcode: data,
      username: username,
    });
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "ean8", "upc_a", "upc_e"],
        }}
        onBarcodeScanned={handleBarcodeScanned}
      />

      <View style={styles.overlay}>
        <Text style={styles.text}>Scan a product barcode</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 12,
    borderRadius: 8,
  },

  text: {
    color: "#fff",
    fontSize: 16,
  },
});
