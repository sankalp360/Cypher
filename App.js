import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import firebase from "firebase";
import { firebaseConfig } from "./app/config/firebase";

firebase.initializeApp(firebaseConfig);

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./app/screens/HomeScreen";
import LoginScreen from "./app/screens/LoginScreen";
import LoadingScreen from "./app/screens/LoadingScreen";

import RootStackScreen from "./app/screens/RootStackScreen";

function App() {
  const [loaded, setLoaded] = useState(true);
  const [auth, setAuth] = useState(true);

  // if (!firebase.apps.length) {
  //   firebase.initializeApp(fireapi.firebaseConfig);
  //   firebase.auth().onAuthStateChanged((user) => {
  //     setAuth = true;
  //   });
  // }

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <RootStackScreen />
      {/* <Stack.Navigator initialRouteName="Cypher">
        <Stack.Screen name="Cypher" component={HomeScreen} />
      </Stack.Navigator> */}
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
