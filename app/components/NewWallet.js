import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  LogBox,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";

const backImage = "../assets/images/Add_Wallet_Screen_Background.png";

import { db, fireauth } from "../config/firebase";

LogBox.ignoreLogs(["Setting a timer"]);

const NewWallet = ({ uid, isWallet }) => {
  const [wallet, setWallet] = useState({
    name: "",
    phone: "",
    country: "",
  });

  const handleNameChange = (val) => {
    setWallet({
      ...wallet,
      name: val,
    });
  };

  const handleMobileChange = (val) => {
    setWallet({
      ...wallet,
      phone: val,
    });
  };

  const handleCountryChange = (val) => {
    setWallet({
      ...wallet,
      country: val,
    });
  };

  const createWallet = () => {
    db.collection("wallets")
      .doc(uid)
      .set({
        name: wallet.name,
        phone: wallet.phone,
        country: wallet.country,
        walletId: "",
      })
      .then(() => {
        isWallet(true);
        console.log("document written");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.upper}>
        <Text style={styles.upperText}>You do not have a wallet</Text>
        <Text style={styles.upperText}>Create a Wallet !</Text>
      </View>
      <View style={styles.createBox}>
        <Text style={styles.boxHead}>Create New Wallet</Text>
        <View style={styles.action}>
          <TextInput
            onChangeText={(val) => handleNameChange(val)}
            placeholder="Name"
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            onChangeText={(val) => handleMobileChange(val)}
            placeholder="Mobile"
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <TextInput
            onChangeText={(val) => handleCountryChange(val)}
            placeholder="Country"
            style={styles.textInput}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => createWallet()}>
          <Text style={styles.buttonText}>Create Wallet</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NewWallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 650,
    paddingVertical: 50,
    marginTop: 40,
    backgroundColor: "transparent",
  },
  upper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  upperText: {
    fontSize: 20,
    marginVertical: 6,
  },
  createBox: {
    flex: 3,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#513C98",
    marginTop: 40,
    borderRadius: 10,
    paddingVertical: 40,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  boxHead: {
    marginBottom: 30,
    fontSize: 17,
    fontWeight: "bold",
  },
  action: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#513C98",
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 8,
  },
  button: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#513C98",
    marginVertical: 8,
    backgroundColor: "#7F5DF0",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff",
  },
  textInput: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    fontSize: 15,
    color: "#513C98",
  },
});
