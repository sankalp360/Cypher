import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const Coin = ({
  name,
  image,
  symbol,
  price,
  priceChange,
}) => {
  let firstName = name.split(" ");

  return (
    <View style={styles.container}>
      <View style={styles.coinRow}>
        <Image resizeMode="contain" style={styles.crypto} source={image} />
        <View style={styles.coin}>
          <Text style={styles.name}>{firstName[0]}</Text>
          <Text style={styles.coinSymbol}>{symbol}</Text>
        </View>
        <View style={styles.coinData}>
          <Text style={styles.coinPrice}>Price: {price.toLocaleString()}</Text>
          {priceChange < 0 ? (
            <Text style={styles.coinPercentRed}>
              Loss: {priceChange.toFixed(2)}%
            </Text>
          ) : (
            <Text style={styles.coinPercentGreen}>
              Gain: {priceChange.toFixed(2)}%
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default Coin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
    alignItems: "center",
    marginVertical: 8,
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    height: 60,
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
    textWrap: "nowrap",
  },
  coinSymbol: {
    textTransform: "uppercase",
  },
  coinData: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  coinPrice:{
    fontSize: 15,
    fontWeight: "semibold",
  },
  coinPercentRed: {
    color: "red",
  },
  coinPercentGreen: {
    color: "green",
  },
});
