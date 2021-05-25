import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

import firebase from "firebase/app";
import "firebase/auth";

import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import LoadingScreen from "./app/screens/LoadingScreen";

import RootTabScreen from "./app/screens/RootTabScreen";
import RootStackScreen from "./app/screens/RootStackScreen";

function App() {
  const [user, setUser] = useState(true);

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      setUser(true);
    } else {
      // No user is signed in.
      setUser(false);
    }
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" />
      <NavigationContainer>
        {user ? <RootTabScreen /> : <RootStackScreen />}
      </NavigationContainer>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
