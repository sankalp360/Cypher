import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const AssetCard = ({
  icon,
  name,
  symbol,
  worth,
  change,
  changeColor,
  iconName,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <MaterialCommunityIcons name={icon} color="#7F5DF0" size={30} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.symbol}>{symbol}</Text>
      </View>
      <View style={styles.value}>
        <Text style={styles.worth}>{worth}</Text>
        <View style={styles.arrow}>
          <MaterialCommunityIcons
            name={iconName}
            color={changeColor}
            size={30}
          />
          <Text style={(styles.change, { color: changeColor })}>{change}</Text>
        </View>
      </View>
    </View>
  );
};

export default AssetCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: 80,
    backgroundColor: "#FFF",
    marginVertical: 10,
    borderRadius: 15,
    padding: 20,
    flexDirection: "row",
  },
  icon: {
    marginRight: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    marginRight: 4,
  },
  symbol: {
    fontSize: 15,
    color: "grey",
    marginRight: 4,
  },
  value: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  worth: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 2,
  },
  arrow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  change: {
    fontSize: 10,
  },
});
