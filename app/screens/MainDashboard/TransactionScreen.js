import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

import * as Animatable from "react-native-animatable";

import { COLORS, SIZES, FONTS } from "../../config/theme";

const TransactionScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Trade Window</Text>
      </View>

      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        {/* Headtext start*/}
        <View style={{ marginVertical: 12 }}>
          <Text
            style={{ textAlign: "center", color: "black", fontWeight: "bold" }}
          >
            Minimum Withdrawal Amount:{" "}
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: COLORS.secondary,
              fontWeight: "bold",
              fontSize: 25,
            }}
          >
            1.000 CYP{" "}
          </Text>
        </View>
        {/* headtext end  */}

        <View style={styles.action}>
          {/* currency tag side wala */}

          <Text
            style={{
              textAlign: "right",
              color: "black",
              width: "20%",
              position: "absolute",
              right: 12,
              fontSize: 20,
              fontWeight: "800",
            }}
          >
            CYP
          </Text>

          <TextInput
            placeholder="Amount"
            style={styles.textInput}
            keyboardType="phone-pad"
          ></TextInput>
        </View>
        {/* End of Amount Input feild */}

        {/* Start of hash adrress input feild */}
        <View style={styles.action}>
          <TextInput
            placeholder="Enter Hash Address"
            style={styles.textInput}
            keyboardType="ascii-capable"
          ></TextInput>
        </View>
        {/* end of hash adrress input feild */}

        {/* start of button send */}
        <View style={styles.transact}>
          <TouchableOpacity>
            <Text
              style={{ color: COLORS.white, fontSize: 18, textAlign: "center" }}
            >
              SEND
            </Text>
          </TouchableOpacity>
        </View>
        {/* end of button */}

        {/* Start of banner */}
        <View
          style={{
            marginTop: 2,
            marginHorizontal: 2,
            padding: 10,
            borderRadius: 7,
            backgroundColor: COLORS.secondary,
            ...styles.shadow,
            opacity: 0.9,
          }}
        >
          {/* create two text Componenet */}
          <Text
            style={{ color: COLORS.white, ...FONTS.h3, marginHorizontal: 8 }}
          >
            Investing Safety:
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
            It's very difficult to time Investment Espesially when market is
            volatile.Learn how to use currency cost averaging to your advantage.
          </Text>

          {/* learn more button */}
          <TouchableOpacity
            style={{
              marginTop: SIZES.base,
            }}
            onPress={() => {
              console.log("Learn More");
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

        {/* END OF BANNER */}
      </Animatable.View>
    </View>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginHorizontal: 10,
    // marginBottom:8,
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    marginTop: 8,
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 15,
    color: "#05375a",
    textAlign: "center",
    fontSize: 15,
  },
  transact: {
    backgroundColor: COLORS.secondary,
    marginVertical: 40,
    marginTop: SIZES.padding,
    marginHorizontal: 4,
    padding: 12,
    borderRadius: SIZES.radius - 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
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
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
