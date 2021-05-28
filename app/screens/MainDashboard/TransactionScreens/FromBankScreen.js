import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from "react-native";

import axios from "axios";

import * as Animatable from "react-native-animatable";
import { COLORS, SIZES } from "../../../config/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const FromBankScreen = ({ navigation, id, base }) => {
  const [money, setMoney] = useState("");
  const [loader, setLoader] = useState(false);
  const [disable, setDisable] = useState(false);
  const [bank, setBank] = useState({
    status: false,
    text: "",
  });

  const handleMoneyChange = (val) => {
    if (parseInt(val) > 200) {
      setMoney("200");
    } else {
      setMoney(val);
    }
    console.log(val);
  };

  function handleRequestFromBank() {
    setDisable(true);
    setLoader(true);
    setMoney("");
    axios
      .post(`${base}/transferFromBank`, {
        UserId: id,
        TransferAmmount: parseInt(money),
      })
      .then(() => {
        setLoader(false);
        setBank({
          status: true,
          text: "Money Received 🤑",
        });
        setTimeout(() => {
          setBank({
            status: false,
            text: "",
          });
          setDisable(false);
        }, 5000);
      })
      .catch((err) => {
        console.log("error: " + err);
        setLoader(false);
        if (err.response.status == 503) {
          setBank({
            status: true,
            text: "Money Received 🤑",
          });
        } else {
          setBank({
            status: true,
            text: "Transaction Failed 🥺",
          });
        }
        setTimeout(() => {
          setBank({
            status: false,
            text: "",
          });
          setDisable(false);
        }, 5000);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("SendMoney")}
          style={styles.sendIcon}
        >
          <MaterialCommunityIcons
            style={styles.sendInner}
            name="send"
            color={COLORS.secondary}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("ReceiveMoney")}
          style={styles.receiveIcon}
        >
          <MaterialCommunityIcons
            style={styles.receiveInner}
            name="call-received"
            color={COLORS.secondary}
            size={30}
          />
        </TouchableOpacity>
        <Text style={styles.text_header}>Add Money To Wallet</Text>
      </View>

      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <View style={styles.footHead}>
          <Text style={styles.footHeadText}>Maximum Transaction Amount:</Text>
          <Text style={styles.footHeadText2}>200.00 CYP</Text>
        </View>
        {bank.status ? (
          <Text style={styles.rsuccessTxt}>{bank.text}</Text>
        ) : null}
        <View style={styles.action}>
          <Text style={styles.actionText}>CYP</Text>

          <TextInput
            onChangeText={(val) => handleMoneyChange(val)}
            placeholder="Amount"
            style={styles.textInput}
            keyboardType="numeric"
            value={money}
          ></TextInput>
        </View>
        <TouchableOpacity
          onPress={handleRequestFromBank}
          disabled={disable}
          style={styles.transact}
        >
          <Text style={styles.transactText}>REQUEST</Text>
        </TouchableOpacity>
        {loader ? <ActivityIndicator size="large" color="#7F5DF0" /> : null}
        <Text style={styles.footMethodText}>Or Exchange Via</Text>
        <TouchableOpacity style={styles.method}>
          <Text style={styles.methodText}>PAYTM</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.method}>
          <Text style={styles.methodText}>UPI</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.method}>
          <Text style={styles.methodText}>DEBIT CARD</Text>
        </TouchableOpacity>
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
  sendIcon: {
    position: "absolute",
    top: 50,
    right: 25,
    backgroundColor: COLORS.white,
    borderRadius: 50,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  receiveIcon: {
    position: "absolute",
    top: 50,
    right: 90,
    backgroundColor: COLORS.white,
    borderRadius: 50,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  sendInner: {
    transform: [{ rotate: "330deg" }],
    marginTop: -3,
    marginLeft: 3,
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
  footHead: {
    marginVertical: 12,
  },
  footHeadText: {
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
  },
  footHeadText2: {
    textAlign: "center",
    color: COLORS.secondary,
    fontWeight: "bold",
    fontSize: 25,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 27,
    marginBottom: -20,
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
