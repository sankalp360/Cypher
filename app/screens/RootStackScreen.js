import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "./SplashScreen";
import SignupScreen from "./SignupScreen";
import LoginScreen from "./LoginScreen";

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="Splash" component={SplashScreen} />
    <RootStack.Screen name="Signup" component={SignupScreen} />
    <RootStack.Screen name="Login" component={LoginScreen} />
  </RootStack.Navigator>
);

export default RootStackScreen;

const styles = StyleSheet.create({});
