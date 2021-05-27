import React from "react";
import { TouchableOpacity } from "react-native";
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
    <TouchableOpacity style={styles.container}>
      <View style={styles.icon}>
        <MaterialCommunityIcons name={icon} color="#7F5DF0" size={40} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.symbol}>{symbol}</Text>
      </View>
      <View style={styles.value}>
        {worth ? (
          <Text style={styles.worth}>{"₹" + parseInt(worth) * 1}</Text>
        ) : (
          <Text style={styles.worth}>Not Revealed</Text>
        )}
        <View style={styles.arrow}>
          {/* <MaterialCommunityIcons
            name={iconName}
            color={changeColor}
            size={30}
          /> */}
          {change ? (
            <Text style={(styles.change, { color: changeColor })}>
              {parseInt(change).toFixed(0)}
            </Text>
          ) : (
            <Text style={(styles.change, { color: changeColor })}>
              Not Revealed
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AssetCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    height: 80,
    backgroundColor: "#FFF",
    marginVertical: 10,
    borderRadius: 15,
    padding: 18,
    flexDirection: "row",
    elevation: 8,
    alignSelf: "center",
  },
  icon: {
    marginRight: 15,
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
