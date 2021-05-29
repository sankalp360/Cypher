import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import { db, fireauth } from "../../config/firebase";

const BaseURL = "https://cypher-advanced-wallet.herokuapp.com";

import MainPortfolioScreen from "./PortfolioScreens/MainPortfolioScreen";
import CreateWalletScreen from "./PortfolioScreens/CreateWalletScreen";
import OneMoreStepScreen from "./PortfolioScreens/OneMoreStepScreen";
import LoadingScreen from "../LoadingScreen";

const PortfolioStack = createStackNavigator();

const PortfolioStackScreen = ({
  navigation,
  BaseURL,
  walletId,
  name,
  phone,
  country,
  privateKey,
  uid,
  isThisWallet,
  isWallet,
}) => {
  function handleAuthChange(childData) {
    isThisWallet(childData);
    setIsWallet(childData);
  }

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 3000);
  }, []);

  return (
    <>
      {loading ? (
        isWallet ? (
          <MainPortfolioScreen
            base={BaseURL}
            id={walletId}
            name={name}
            phone={phone}
            country={country}
            privateKey={privateKey}
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
        )
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};

export default PortfolioStackScreen;

const styles = StyleSheet.create({});
