import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AboutCypher = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: "#000" }}>Cypher</Text>
    </View>
  );
};

export default AboutCypher;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
