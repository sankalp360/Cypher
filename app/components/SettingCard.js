import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const SettingCard = ({ icon, title, subtitle }) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <MaterialCommunityIcons name={icon} color="#7F5DF0" size={30} />
      </View>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

export default SettingCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 4,
    flexDirection: "row",
    padding: 20,
    height: "10%",
  },
  icon: {
    marginRight: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "grey",
  },
});
