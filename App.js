import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { fireapp } from "./app/config/firebase";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RootTabScreen from "./app/screens/RootTabScreen";
import LoadingScreen from "./app/screens/LoadingScreen";

import RootStackScreen from "./app/screens/RootStackScreen";

import { AuthProvider } from "./app/contexts/AuthContext";

function App() {
  const [loaded, setLoaded] = useState(true);
  const [auth, setAuth] = useState(true);

  const Stack = createStackNavigator();

  return (
    <AuthProvider>
      <NavigationContainer>
        <RootStackScreen />
        {/* <Stack.Navigator initialRouteName="Cypher">
        <Stack.Screen name="Cypher" component={RootTabScreen} />
      </Stack.Navigator> */}
      </NavigationContainer>
    </AuthProvider>
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
