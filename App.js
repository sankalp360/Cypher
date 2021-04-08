import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import * as firebase from "firebase/app";
import "firebase/auth";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RootTabScreen from "./app/screens/RootTabScreen";
import LoadingScreen from "./app/screens/LoadingScreen";

import GettingStartedScreen from './app/screens/GettingStarted/GettingStartedScreen'
import LoginScreen from './app/screens/GettingStarted/LoginScreen'

import RootStackScreen from "./app/screens/RootStackScreen";

import { AuthProvider } from "./app/contexts/AuthContext";
import fireapp from "./app/config/firebase";

function App() {
  const [loaded, setLoaded] = useState(true);
  const [user, setUser] = useState(true);

  const Stack = createStackNavigator();

  let auth = firebase.auth();

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      setUser(true)
    } else {
      // No user is signed in.
      setUser(false)
    }
  });

  return (
    <NavigationContainer>
      {user ? (
        <RootTabScreen />
      ) : (
        <RootStackScreen />
      )}
    </NavigationContainer>
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

export default App;
