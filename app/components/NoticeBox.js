import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { COLORS, SIZES, FONTS } from "../config/theme";

const NoticeBox = () => {
  return (
    <View
      style={{
        marginTop: SIZES.padding,
        padding: 10,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.secondary,
        ...styles.shadow,
      }}
    >
      <Text style={{ color: COLORS.white, ...FONTS.h3, marginHorizontal: 8 }}>
        Investing Safety
      </Text>
      <Text
        style={{
          color: COLORS.white,
          marginTop: 8,
          lineHeight: 18,
          ...FONTS.body4,
          marginHorizontal: 8,
        }}
      >
        It's very difficult to time Investment Especially when the market is
        volatile. Learn how to use currency cost averaging to your advantage.
      </Text>

      {/* learn more button */}
      <TouchableOpacity
        style={{
          marginTop: SIZES.base,
        }}
        onPress={() => {
          console.log("Learn More ");
        }}
      >
        <Text
          style={{
            color: "#F0B0F0",
            textDecorationLine: "underline",
            marginHorizontal: 8,
          }}
        >
          Learn More
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoticeBox;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
