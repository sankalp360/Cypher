import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import MainSettingScreen from "./SettingScreens/MainSettingScreen";
import AboutCypher from "./SettingScreens/AboutCypher";

const SettingStack = createStackNavigator();

const SettingStackScreen = ({ navigation, name, senderId, phone }) => {
  return (
    <SettingStack.Navigator headerMode="none">
      <SettingStack.Screen name="Main">
        {(props) => (
          <MainSettingScreen
            {...props}
            name={name}
            phone={phone}
            senderId={senderId}
          />
        )}
      </SettingStack.Screen>

      <SettingStack.Screen name="About" component={AboutCypher} />
    </SettingStack.Navigator>
  );
};

export default SettingStackScreen;

const styles = StyleSheet.create({});
