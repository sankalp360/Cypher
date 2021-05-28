import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { COLORS } from "../config/theme";

const CypherCoin = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.coinRow}>
        <Image
          resizeMode="contain"
          style={styles.crypto}
          source={require("../assets/images/cypher.png")}
        />
        <View style={styles.coin}>
          <Text style={styles.name}>Cypher</Text>
          <Text style={styles.coinSymbol}>CYP</Text>
        </View>
        <View style={styles.coinData}>
          <Text style={styles.coinPrice}>₹1.00</Text>
          <Text style={styles.coinPercentGreen}>Gain: 0.00%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CypherCoin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    height: 60,
    borderColor: COLORS.secondary,
    borderWidth: 1.5,
  },
  coinRow: {
    flex: 1,
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  crypto: {
    height: 40,
    width: 40,
  },
  coin: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
  },
  coinSymbol: {
    textTransform: "uppercase",
  },
  coinData: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  coinPrice: {
    fontSize: 15,
    fontWeight: "600",
  },
  coinPercentRed: {
    color: "red",
  },
  coinPercentGreen: {
    color: "green",
  },
});
