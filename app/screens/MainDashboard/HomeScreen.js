import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar,
} from "react-native";

import firebase from "firebase/app";
import "firebase/auth";

import { icons } from "../../config";
import { COLORS, FONTS, SIZES } from "../../config/theme";
import images from "../../config/images";
import { shadow } from "react-native-paper";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";

const HomeScreen = () => {
  //   firebase gettoken function
  const getToken = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((data) => {
          console.log(data);
        });
      }
    });
  };
  // header function
  function header() {
    return (
      <View
        style={{
          width: "100%",
          height: 200,
        }}
      >
        <ImageBackground
          source={images.ban}
          resizeMode="cover"
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent",
              width: "75%",
              height: 100,
              marginVertical: 30,
            }}
          >
            <Text style={{ color: "white" }}>Your Current Balance</Text>
            <Text style={{ color: "white", fontSize: 25 }}>RS 150000 </Text>
            <Text>+2.14 updated</Text>
          </View>
        </ImageBackground>
      </View>
    );
  }

  const coinbox = () => {
    return <View style={styles.coinbox}></View>;
  };
  const coinbox2 = () => {
    return <View style={styles.coinbox2}></View>;
  };
  const messagebox = () => {
    return <View style={styles.messagebox}></View>;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {header()}
        {coinbox()}
        {coinbox2()}
        {coinbox()}
        {coinbox2()}
        {coinbox()}
        {coinbox2()}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    // alignItems: "center",
    // justifyContent: "center",
    paddingBottom: 130,
  },
  coinbox: {
    width: "90%",
    height: 100,
    backgroundColor: COLORS.primary,
    marginVertical: 10,
    marginHorizontal: 20,
    opacity: 0.72,
    borderRadius: SIZES.radius,
  },
  coinbox2: {
    width: "90%",
    height: 100,
    backgroundColor: COLORS.primary,
    marginVertical: 10,
    marginHorizontal: 20,
    opacity: 0.9,
    borderRadius: SIZES.radius,
  },
  messagebox: {
    width: "90%",
    height: 100,
    backgroundColor: COLORS.primary,
    marginVertical: 10,
    marginHorizontal: 20,
    opacity: 0.9,
    borderRadius: SIZES.radius,
  },
});

{
  /* <Button onPress={() => getToken()} title="Get Token" />   
      
                        */
}
