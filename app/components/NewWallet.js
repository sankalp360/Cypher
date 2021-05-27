import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  LogBox,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import * as Animatable from "react-native-animatable";

import { COLORS, SIZES, FONTS } from "../config/theme";

import { db } from "../config/firebase";

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
        privateKey: "",
      })
      .then(() => {
        isWallet(true);
        console.log("document written");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>You don't Have a Wallet</Text>
        <Text style={styles.text_header}>Create A Wallet 👇</Text>
      </View>

      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        {/* Headtext start*/}
        <View style={{ marginVertical: 12 }}>
          <Text
            style={{
              textAlign: "center",
              color: COLORS.secondary,
              fontWeight: "bold",
              fontSize: 25,
            }}
          >
            Create New Wallet
          </Text>
        </View>
        {/* headtext end  */}

        <View style={styles.action}>
          <TextInput
            onChangeText={(val) => handleNameChange(val)}
            placeholder="Name"
            style={styles.textInput}
          ></TextInput>
        </View>
        {/* End of Amount Input feild */}

        {/* Start of hash adrress input feild */}
        <View style={styles.action}>
          <TextInput
            onChangeText={(val) => handleMobileChange(val)}
            placeholder="Phone"
            style={styles.textInput}
            keyboardType="phone-pad"
          ></TextInput>
        </View>
        {/* end of hash adrress input feild */}

        {/* Start of hash adrress input feild */}
        <View style={styles.action}>
          <TextInput
            onChangeText={(val) => handleCountryChange(val)}
            placeholder="Country"
            style={styles.textInput}
          ></TextInput>
        </View>
        {/* end of hash adrress input feild */}

        {/* start of button send */}
        <TouchableOpacity
          style={styles.transact}
          onPress={() => createWallet()}
        >
          <Text
            style={{ color: COLORS.white, fontSize: 18, textAlign: "center" }}
          >
            CREATE
          </Text>
        </TouchableOpacity>
        {/* end of button */}
      </Animatable.View>
    </View>
  );
};

export default NewWallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 650,
    backgroundColor: COLORS.secondary,
    margin: -20,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginHorizontal: 10,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  text_footer: {
    marginTop: 8,
    color: "#05375a",
    fontSize: 18,
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
  action: {
    flexDirection: "row",
    marginTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 15,
    color: "#05375a",
    textAlign: "left",
    fontSize: 15,
  },
  transact: {
    backgroundColor: COLORS.secondary,
    marginVertical: 40,
    marginTop: SIZES.padding,
    marginHorizontal: 4,
    padding: 12,
    borderRadius: SIZES.radius - 5,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
