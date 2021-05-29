import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, LogBox } from "react-native";
import * as Animatable from "react-native-animatable";
// import LinearGradient from 'react-native-linear-gradient';

import HomeScreen from "./MainDashboard/HomeScreen";
import PortfolioStackScreen from "./MainDashboard/PortfolioStackScreen";
import TransactionStackScreen from "./MainDashboard/TransactionStackScreen";
import MarketScreen from "./MainDashboard/MarketScreen";
import SettingStackScreen from "./MainDashboard/SettingStackScreen";

//for theme ......................
import { COLORS, FONTS } from "../config/theme";
import icons from "../config/icons";

//  .....................change.....................
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import MarketScreenOld from "./MainDashboard/MarketScreenOld";

import { db, fireauth } from "../config/firebase";

const BaseURL = "https://cypher-advanced-wallet.herokuapp.com";

LogBox.ignoreLogs(["Setting a timer"]);

const Tab = createBottomTabNavigator();

function RootTabScreen() {
  const [wallet, setWallet] = useState({
    name: "",
    phone: "",
    country: "",
    walletId: "",
    privateKey: "",
  });
  const [isWallet, setIsWallet] = useState(false); //*
  const [senderId, setSenderId] = useState("");
  const [uid, setUid] = useState("ini"); //*
  const [zoom, setZoom] = useState({
    zoomOut: {
      0: {
        opacity: 1,
        scale: 1,
      },
      1: {
        opacity: 1,
        scale: 1,
      },
    },
  });

  useEffect(() => {}, [zoom]);

  fireauth.onAuthStateChanged((user) => {
    if (user) {
      console.log("available");
      setUid(user.uid);
    }
  });

  useEffect(() => {
    let docRef = db.collection("wallets").doc(uid); //* Setting Reference variable for the Firestore wallet document associated with the User account.
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setSenderId(doc.data().walletId); //* fetching the remote User Wallet data and setting it into the Local State.
          console.log(doc.data().walletId);
        } else {
          console.log("No such document!"); //* doc.data() will be undefined in this case
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [uid]);

  useEffect(() => {
    let docRef = db.collection("wallets").doc(uid); //* Setting Reference variable for the Firestore wallet document associated with the User account.
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setIsWallet(true); //* If Doc Exists Display Portfolio Screen with User Data
          setWallet({
            name: doc.data().name,
            phone: doc.data().phone,
            country: doc.data().country,
            walletId: doc.data().walletId,
            privateKey: doc.data().privateKey,
          }); //* fetching the remote User Wallet data and setting it into the Local State.
        } else {
          console.log("No such document!"); //* doc.data() will be undefined in this case
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [uid, isWallet]); //* Runs always on these state changes.

  function handleAuthChange(childData) {
    setIsWallet(true);
  }

  function handleZoomOut() {
    setZoom({
      zoomOut: {
        0: {
          opacity: 1,
          scale: 1,
        },
        0.5: {
          opacity: 1,
          scale: 0.6,
        },
        1: {
          opacity: 1,
          scale: 1,
        },
      },
    });
    setTimeout(() => {
      setZoom({
        zoomOut: {
          0: {
            opacity: 1,
            scale: 1,
          },
          1: {
            opacity: 1,
            scale: 1,
          },
        },
      });
    }, 300);
  }

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
        keyboardHidesTabBar: true,
        style: {
          backgroundColor: COLORS.white,
          height: 50,
          borderTopColor: "grey",
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
                size={20}
              />

              <Text
                style={{
                  color: focused ? COLORS.secondary : COLORS.black,
                  ...FONTS.body5,
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Portfolio"
        options={{
          tabBarLabel: "Portfolio",
          tabBarIcon: ({ focused }) => (
            <Animatable.View style={styles.IconView}>
              <MaterialCommunityIcons
                name="account"
                color={focused ? COLORS.secondary : COLORS.black}
                size={20}
              />

              <Text
                style={{
                  color: focused ? COLORS.secondary : COLORS.black,
                  ...FONTS.body5,
                }}
              >
                Portfolio
              </Text>
            </Animatable.View>
          ),
        }}
      >
        {(props) => (
          <PortfolioStackScreen
            {...props}
            uid={uid}
            BaseURL={BaseURL}
            walletId={wallet.walletId}
            name={wallet.name}
            phone={wallet.phone}
            country={wallet.country}
            privateKey={wallet.privateKey}
            isWallet={isWallet}
            isThisWallet={handleAuthChange}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Transaction"
        options={{
          tabBarLabel: "Transaction",
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity activeOpacity={1} onPress={handleZoomOut}>
              <Animatable.View
                animation={zoom.zoomOut}
                style={styles.transactionBtn}
                duration={200}
              >
                <MaterialCommunityIcons
                  name="repeat"
                  color={focused ? COLORS.white : COLORS.white}
                  size={20}
                />
              </Animatable.View>
            </TouchableOpacity>
          ),
        }}
      >
        {(props) => (
          <TransactionStackScreen
            {...props}
            BaseURL={BaseURL}
            senderId={senderId}
          />
        )}
      </Tab.Screen>
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
                size={20}
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
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity>
              <View style={styles.IconView}>
                <MaterialCommunityIcons
                  name="cog"
                  color={focused ? COLORS.secondary : COLORS.black}
                  size={20}
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
      >
        {(props) => (
          <SettingStackScreen
            {...props}
            name={wallet.name}
            senderId={senderId}
          />
        )}
      </Tab.Screen>
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
    height: 45,
    width: 45,
    backgroundColor: COLORS.secondary,
    borderRadius: 50,
  },
});
