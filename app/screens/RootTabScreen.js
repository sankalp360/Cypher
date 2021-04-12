import React from "react";
import { View, Image, TouchabaleOpacity, Text, StyleSheet } from "react-native";
// import LinearGradient from 'react-native-linear-gradient';

import HomeScreen from "./MainDashboard/HomeScreen";
import PortfolioScreen from "./MainDashboard/PortfolioScreen";
import TransactionScreen from "./MainDashboard/TransactionScreen";
import MarketScreen from "./MainDashboard/MarketScreen";
import SettingScreen from "./MainDashboard/SettingScreen";

//for theme ......................
import { COLORS, FONTS } from "../config/theme";
import icons from "../config/icons";

//  .....................change.....................
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

function RootTabScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
        style: {
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          backgroundColor: COLORS.white,
          height: 100,
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
                color={focused ? COLORS.primary : COLORS.black}
                size={30}
              />

              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.black,
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
                color={focused ? COLORS.primary : COLORS.black}
                size={30}
              />

              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.black,
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
        component={TransactionScreen}
        options={{
          tabBarLabel: "Transaction",
          tabBarIcon: ({ focused }) => (
            <View
              style={styles.transactionBtn}
            >
              <MaterialCommunityIcons
                name="repeat"
                color={focused ? COLORS.white : COLORS.white}
                size={30}
              />
            </View>
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
                color={focused ? COLORS.primary : COLORS.black}
                size={30}
              />
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.black,
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
            <View style={styles.IconView}>
              <MaterialCommunityIcons
                name="cog"
                color={focused ? COLORS.primary : COLORS.black}
                size={30}
              />
              <Text
                style={{
                  color: focused ? COLORS.primary : COLORS.black,
                  ...FONTS.body5,
                }}
              >
                Settings
              </Text>
            </View>
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
  transactionBtn:
    {
      alignItems: "center",
      justifyContent: "center",
      height: 60,
      width: 60,
      backgroundColor: COLORS.primary,
      borderRadius: 50
    }
});
