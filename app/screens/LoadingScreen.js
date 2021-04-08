import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

import firebase from "firebase";

export default function LoadingScreen({ navigation }) {
  const componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      navigation.navigate(user ? "RootTabScreen" : "RootStackScreen");
    });
  };

  return (
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
