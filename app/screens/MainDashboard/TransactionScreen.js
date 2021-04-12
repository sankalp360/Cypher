import React from "react";
import { StyleSheet, Text, View } from "react-native";

const TransactionScreen = () => {
  return (
    <View style={styles.container}>
      <Text>TransactionScreen</Text>
    </View>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
