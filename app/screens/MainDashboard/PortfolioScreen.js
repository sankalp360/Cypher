import React from "react";
import { StyleSheet, Text, View } from "react-native";

const PortfolioScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Portfolio</Text>
    </View>
  );
};

export default PortfolioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
});
