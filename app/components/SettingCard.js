import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { COLORS } from "../config/theme";

const SettingCard = ({ icon, title, subtitle }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.icon}>
        <MaterialCommunityIcons
          name={icon}
          color={COLORS.secondary}
          size={30}
        />
      </View>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
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
