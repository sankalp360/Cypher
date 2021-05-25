import React, { useState } from "react";
import axios from "axios";
import { ActivityIndicator } from "react-native";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { db, fireauth } from "../config/firebase";

const CryptoRequest = () => {
  const [wallet, setWallet] = useState({
    walletId: "",
    privateKey: "",
  });

  const [uid, setUid] = useState("ini");

  const [isSet, setIsSet] = useState(false);

  fireauth.onAuthStateChanged((user) => {
    if (user) {
      setUid(user.uid);
    }
  });

  const [loader, setLoader] = useState(false);

  function handleCryptoAccess() {
    setLoader(true);
    axios
      .get("https://cypher-advanced-wallet.herokuapp.com/createUser")
      .then((res) => {
        setWallet({
          ...wallet,
          walletId: res.data.Address,
          privateKey: res.data.PrivateKey,
        });
        console.log(res.data); //-> debugging data coming from the server API
      })
      .then(() => {
        setIsSet(true);
        setLoader(false);
      })
      .catch((error) => console.log(error));
  }

  function handleWallet() {
    setLoader(true);
    setTimeout(() => {
      db.collection("wallets")
        .doc(uid)
        .update({
          walletId: wallet.walletId,
          privateKey: wallet.privateKey,
        })
        .then(() => {
          console.log("document written");
        })
        .catch((err) => console.log(err.message));
    }, 2000);
  }

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        {isSet ? (
          <View>
            <Text style={styles.hiddenText}>Congratulations!</Text>
            <TouchableOpacity
              style={styles.cryptoAccess}
              onPress={handleWallet}
            >
              <Text style={styles.cryptoAccessText}>Continue</Text>
            </TouchableOpacity>
            {loader ? <ActivityIndicator size="large" color="#7F5DF0" /> : null}
          </View>
        ) : (
          <View>
            <Text style={styles.hiddenText}>Just One More Step</Text>
            <TouchableOpacity
              style={styles.cryptoAccess}
              onPress={handleCryptoAccess}
            >
              <Text style={styles.cryptoAccessText}>Crypto Access Request</Text>
            </TouchableOpacity>
            {loader ? <ActivityIndicator size="large" color="#7F5DF0" /> : null}
          </View>
        )}
      </View>
    </View>
  );
};

export default CryptoRequest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: "transparent",
    padding: 20,
  },
  hiddenText: {
    fontSize: 30,
    marginTop: 250,
    textAlign: "center",
  },
  cryptoAccess: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#513C98",
    marginVertical: 100,
    backgroundColor: "#7F5DF0",
  },
  cryptoAccessText: {
    fontWeight: "bold",
    color: "#fff",
  },
});
