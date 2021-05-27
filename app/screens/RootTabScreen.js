import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
// import LinearGradient from 'react-native-linear-gradient';

import HomeScreen from "./MainDashboard/HomeScreen";
import PortfolioScreen from "./MainDashboard/PortfolioScreen";
import TransactionStackScreen from "./MainDashboard/TransactionStackScreen";
import MarketScreen from "./MainDashboard/MarketScreen";
import SettingScreen from "./MainDashboard/SettingScreen";

//for theme ......................
import { COLORS, FONTS } from "../config/theme";
import icons from "../config/icons";

//  .....................change.....................
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Tab = createBottomTabNavigator();

function RootTabScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: COLORS.white,
          height: 70,
          borderTopColor: "transparent",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <View style={styles.IconView}>
              <MaterialCommunityIcons
                name="home"
                color={focused ? COLORS.secondary : COLORS.black}
                size={30}
              />

              <Text
                style={{
                  color: focused ? COLORS.secondary : COLORS.black,
                  ...FONTS.body5,
                }}
              >
                HOME
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{
          tabBarLabel: "Portfolio",
          tabBarIcon: ({ focused }) => (
            <View style={styles.IconView}>
              <MaterialCommunityIcons
                name="account"
                color={focused ? COLORS.secondary : COLORS.black}
                size={30}
              />

              <Text
                style={{
                  color: focused ? COLORS.secondary : COLORS.black,
                  ...FONTS.body5,
                }}
              >
                PortFolio
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={TransactionStackScreen}
        options={{
          tabBarLabel: "Transaction",
          tabBarIcon: ({ focused }) => (
            <Animatable.View style={styles.transactionBtn}>
              <MaterialCommunityIcons
                name="repeat"
                color={focused ? COLORS.white : COLORS.white}
                size={30}
              />
            </Animatable.View>
          ),
        }}
      />
      <Tab.Screen
        name="Market"
        component={MarketScreen}
        options={{
          tabBarLabel: "Market",
          tabBarIcon: ({ focused }) => (
            <View style={styles.IconView}>
              <MaterialCommunityIcons
                name="arrow-top-right"
                color={focused ? COLORS.secondary : COLORS.black}
                size={30}
              />
              <Text
                style={{
                  color: focused ? COLORS.secondary : COLORS.black,
                  ...FONTS.body5,
                }}
              >
                Market
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity>
              <View style={styles.IconView}>
                <MaterialCommunityIcons
                  name="cog"
                  color={focused ? COLORS.secondary : COLORS.black}
                  size={30}
                />
                <Text
                  style={{
                    color: focused ? COLORS.secondary : COLORS.black,
                    ...FONTS.body5,
                  }}
                >
                  Settings
                </Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default RootTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  IconView: {
    justifyContent: "center",
    alignItems: "center",
  },
  transactionBtn: {
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    width: 60,
    backgroundColor: COLORS.secondary,
    borderRadius: 50,
  },
});
