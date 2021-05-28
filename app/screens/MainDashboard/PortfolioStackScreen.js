import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import { db, fireauth } from "../../config/firebase";

const BaseURL = "https://cypher-advanced-wallet.herokuapp.com";

import MainPortfolioScreen from "./PortfolioScreens/MainPortfolioScreen";
import CreateWalletScreen from "./PortfolioScreens/CreateWalletScreen";
import OneMoreStepScreen from "./PortfolioScreens/OneMoreStepScreen";

const PortfolioStack = createStackNavigator();

const PortfolioStackScreen = ({ navigation }) => {
  const [wallet, setWallet] = useState({
    name: "",
    phone: "",
    country: "",
    walletId: "",
    privateKey: "",
  });

  const [amount, setAmount] = useState(""); //*
  const [isWallet, setIsWallet] = useState(false); //*
  const [uid, setUid] = useState("ini"); //*
  const [reveal, setReveal] = useState(false); //*
  const [money, setMoney] = useState("");
  const [disable, setDisable] = useState(false);
  const [bank, setBank] = useState({
    status: false,
    text: "",
  });

  function handleAuthChange(childData) {
    setIsWallet(true);
  }

  fireauth.onAuthStateChanged((user) => {
    if (user) {
      setUid(user.uid);
    }
  }); //*

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

  return (
    <>
      {isWallet ? (
        <MainPortfolioScreen
          base={BaseURL}
          id={wallet.walletId}
          name={wallet.name}
          phone={wallet.phone}
          country={wallet.country}
          privateKey={wallet.privateKey}
        />
      ) : (
        <PortfolioStack.Navigator headerMode="none">
          <PortfolioStack.Screen name="AddWallet">
            {(props) => <CreateWalletScreen {...props} uid={uid} />}
          </PortfolioStack.Screen>
          <PortfolioStack.Screen name="OneMoreStep">
            {(props) => (
              <OneMoreStepScreen
                {...props}
                uid={uid}
                isWallet={handleAuthChange}
              />
            )}
          </PortfolioStack.Screen>
        </PortfolioStack.Navigator>
      )}
    </>
  );
};

export default PortfolioStackScreen;

const styles = StyleSheet.create({});
