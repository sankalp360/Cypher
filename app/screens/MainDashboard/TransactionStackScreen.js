import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import FromBankScreen from "./TransactionScreens/FromBankScreen";
import SendMoneyScreen from "./TransactionScreens/SendMoneyScreen";
import ReceiveMoneyScreen from "./TransactionScreens/ReceiveMoneyScreen";

import { db, fireauth } from "../../config/firebase";

const BaseURL = "https://cypher-advanced-wallet.herokuapp.com";

const TransactionStack = createStackNavigator();

const TransactionStackScreen = ({ navigation }) => {
  const [senderId, setSenderId] = useState("");

  const [uid, setUid] = useState("ini"); //*

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

  return (
    <TransactionStack.Navigator headerMode="none">
      <TransactionStack.Screen name="FromBank">
        {(props) => <FromBankScreen {...props} base={BaseURL} id={senderId} />}
      </TransactionStack.Screen>
      <TransactionStack.Screen name="SendMoney">
        {(props) => <SendMoneyScreen {...props} base={BaseURL} id={senderId} />}
      </TransactionStack.Screen>
      <TransactionStack.Screen name="ReceiveMoney">
        {(props) => <ReceiveMoneyScreen {...props} id={senderId} />}
      </TransactionStack.Screen>
    </TransactionStack.Navigator>
  );
};

export default TransactionStackScreen;

const styles = StyleSheet.create({});
