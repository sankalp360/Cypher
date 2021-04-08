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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
