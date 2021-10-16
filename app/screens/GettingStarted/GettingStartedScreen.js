import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Animatable from "react-native-animatable";

import { COLORS } from "../../config/theme";

const GettingStartedScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.secondary} barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duration={1500}
          source={require("../../assets/icons/logoWhite.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.title}>Cypher: Secure Payments</Text>
        <Text style={styles.text}>Send Money Seamlessly</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <LinearGradient
              colors={["#5D2DFD", "#21008F"]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Getting Started</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default GettingStartedScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: COLORS.secondary,
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "black",
    marginTop: 10,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
});
