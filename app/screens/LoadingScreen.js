import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

import { COLORS } from "../config/theme";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.white} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    paddingTop: 350,
  },
});

export default LoadingScreen;
