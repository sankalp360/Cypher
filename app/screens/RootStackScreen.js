import React from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import GettingStartedScreen from "./GettingStarted/GettingStartedScreen";
import SignupScreen from "./GettingStarted/SignupScreen";
import LoginScreen from "./GettingStarted/LoginScreen";
import RootTabScreen from "./RootTabScreen";

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="GettingStarted" component={GettingStartedScreen} />
    <RootStack.Screen name="Signup" component={SignupScreen} />
    <RootStack.Screen name="Login" component={LoginScreen} />
    <RootStack.Screen name="Dashboard" component={RootTabScreen} />
  </RootStack.Navigator>
);

export default RootStackScreen;

const styles = StyleSheet.create({});
