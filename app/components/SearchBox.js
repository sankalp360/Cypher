import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { COLORS } from "../config/theme";

const SearchBox = ({ fetchSearch }) => {
  const handleChange = (val) => {
    fetchSearch(val);
  };

  return (
    <View style={styles.coinSearch}>
      <TextInput
        placeholderTextColor="#fff"
        style={styles.textIn}
        onChangeText={(val) => handleChange(val)}
        placeholder="Search For A Currency.."
      />
      <MaterialCommunityIcons name="magnify" color={COLORS.white} size={27} />
    </View>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  coinSearch: {
    flex: 1,
    width: "100%",
    height: 60,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 15,
    borderRadius: 10,
  },
  coinText: {
    padding: 10,
    justifyContent: "center",
  },
  textIn: {
    height: 40,
    width: "83%",
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1,
    borderRadius: 10,
    color: COLORS.white,
    marginRight: 5,
    paddingHorizontal: 10,
  },
});
