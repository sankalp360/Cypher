import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import * as Animatable from "react-native-animatable";

import { COLORS } from "../config/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const TransactionButton = ({ focused, navigation }) => {
  const [zoom, setZoom] = useState({
    zoomOut: {
      0: {
        opacity: 1,
        scale: 1,
      },
      1: {
        opacity: 1,
        scale: 1,
      },
    },
  });

  useEffect(() => {}, [zoom]);

  function handleZoomOut() {
    setZoom({
      zoomOut: {
        0: {
          opacity: 1,
          scale: 1,
        },
        0.5: {
          opacity: 1,
          scale: 0.6,
        },
        1: {
          opacity: 1,
          scale: 1,
        },
      },
    });
    setTimeout(() => {
      setZoom({
        zoomOut: {
          0: {
            opacity: 1,
            scale: 1,
          },
          1: {
            opacity: 1,
            scale: 1,
          },
        },
      });
    }, 300);

    navigation.navigate("Portfolio");
  }

  return (
    <TouchableOpacity activeOpacity={1} onPress={handleZoomOut}>
      <Animatable.View
        animation={zoom.zoomOut}
        style={styles.transactionBtn}
        duration={200}
      >
        <MaterialCommunityIcons
          name="repeat"
          color={focused ? COLORS.white : COLORS.white}
          size={20}
        />
      </Animatable.View>
    </TouchableOpacity>
  );
};

export default TransactionButton;

const styles = StyleSheet.create({
  transactionBtn: {
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: 45,
    backgroundColor: COLORS.secondary,
    borderRadius: 50,
  },
});
