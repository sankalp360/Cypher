import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import { db, fireauth } from "../../../config/firebase";

import * as Animatable from "react-native-animatable";
import { COLORS, SIZES } from "../../../config/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const FromBankScreen = ({ navigation, uid }) => {
  const [wallet, setWallet] = useState({
    name: "",
    phone: "",
    country: "",
  });

  const [loader, setLoader] = useState(false);
  const [disable, setDisable] = useState(false);

  const handleNameChange = (val) => {
    setWallet({
      ...wallet,
      name: val,
    });
  };

  const handlePhoneChange = (val) => {
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
    setDisable(true);
    setLoader(true);
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
        setLoader(false);
        console.log("document written");
        navigation.navigate("OneMoreStep");
        setDisable(false);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.secondary} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Create New Wallet</Text>
      </View>

      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.footHead}>
            <Text style={styles.footHeadText}>You Don't Have A Wallet !</Text>
            <Text style={styles.footHeadText2}>Create One </Text>
            {loader ? <ActivityIndicator size="large" color="#7F5DF0" /> : null}
          </View>
          <View style={styles.action}>
            <TextInput
              onChangeText={(val) => handleNameChange(val)}
              placeholder="Name"
              style={styles.textInput}
              keyboardType="ascii-capable"
            ></TextInput>
          </View>
          <View style={styles.action}>
            <TextInput
              onChangeText={(val) => handlePhoneChange(val)}
              placeholder="Phone"
              style={styles.textInput}
              keyboardType="phone-pad"
            ></TextInput>
          </View>
          <View style={styles.action}>
            <TextInput
              onChangeText={(val) => handleCountryChange(val)}
              placeholder="Country"
              style={styles.textInput}
              keyboardType="ascii-capable"
            ></TextInput>
          </View>
          <TouchableOpacity
            onPress={createWallet}
            disabled={disable}
            style={styles.transact}
          >
            <Text style={styles.transactText}>CREATE</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default FromBankScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 27,
    marginBottom: -20,
  },
  footer: {
    flex: 5,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginHorizontal: 10,
  },
  footHead: {
    marginVertical: 5,
  },
  footHeadText: {
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
  },
  footHeadText2: {
    textAlign: "center",
    color: COLORS.black,
    fontWeight: "bold",
    fontSize: 20,
  },
  text_footer: {
    marginTop: 8,
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionText: {
    textAlign: "right",
    color: "black",
    width: "20%",
    position: "absolute",
    right: 12,
    fontSize: 20,
    fontWeight: "800",
  },
  textInput: {
    flex: 1,
    paddingLeft: 15,
    color: "#05375a",
    textAlign: "left",
    fontSize: 17,
    fontWeight: "200",
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  transact: {
    backgroundColor: COLORS.secondary,
    marginTop: 40,
    marginTop: SIZES.padding,
    marginHorizontal: 4,
    padding: 12,
    borderRadius: SIZES.radius - 5,
    elevation: 8,
  },
  transactText: {
    color: COLORS.white,
    fontSize: 18,
    textAlign: "center",
  },
  footMethodText: {
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 20,
  },
  method: {
    backgroundColor: "#EAE9F3",
    marginVertical: 5,
    marginHorizontal: 4,
    padding: 12,
    borderRadius: SIZES.radius - 5,
    elevation: 3,
  },
  methodText: {
    color: COLORS.secondary,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "700",
    letterSpacing: 2,
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
  rsuccessTxt: {
    marginBottom: 10,
    textAlign: "center",
    color: COLORS.secondary,
    fontSize: 15,
    fontWeight: "bold",
  },
});
