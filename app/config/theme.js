import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  primary: "#395563", // blueviolet
  secondary: "#042743", // Dark tone

  white: "#FFF",
  black: "#000000",
  green: "green",
  red: "red",
  gray: "#d0a9a0",
  lightGray: "#dbdbdb",
  lightGray1: "#f5f6fa",
  AliceBlue:"#F0F8FF",
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};
export const FONTS = {
  h1: { fontFamily: "sans-serif", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "sans-serif", fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: "sans-serif", fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: "sans-serif", fontSize: SIZES.h4, lineHeight: 22 },
  
  body1: {
    // fontFamily: "Roboto-Regular",
    fontFamily: "sans-serif",
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    // fontFamily: "Roboto-Regular",
    fontFamily: "sans-serif",
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    // fontFamily: "Roboto-Regular",
    fontFamily: "sans-serif",
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    // fontFamily: "Roboto-Regular",
    fontFamily: "sans-serif",
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: "sans-serif",
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
};
