import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import axios from "axios";

import * as Animatable from "react-native-animatable";
import { COLORS, SIZES, FONTS } from "../../../config/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const SendMoneyScreen = ({ navigation, id, base }) => {
  const [money, setMoney] = useState("");
  const [receiverId, setReceiverId] = useState("");
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

  const handleReceiverIdChange = (val) => {
    setReceiverId(val);
    console.log(val);
  };

  const setQuickAmount = (val) => {
    setMoney(val);
  };

  function handleSendMoney() {
    setDisable(true);
    setLoader(true);
    setMoney("");
    setReceiverId("");
    axios
      .post(`${base}/transferBtwUsers`, {
        FromUserId: id,
        ToUserId: receiverId,
        TransferAmmount: parseInt(money),
      })
      .then(() => {
        setLoader(false);
        setBank({
          status: true,
          text: "Money Sent 👍",
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
        setBank({
          status: true,
          text: "Transaction Failed 🥺",
        });
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
          onPress={() => navigation.goBack()}
          style={styles.backIcon}
        >
          <MaterialCommunityIcons
            style={styles.backInner}
            name="arrow-left"
            color={COLORS.secondary}
            size={30}
          />
        </TouchableOpacity>
        <Text style={styles.text_header}>Send Money</Text>
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
        <View style={styles.action}>
          <TextInput
            onChangeText={(val) => handleReceiverIdChange(val)}
            placeholder="Enter Receiver's Id"
            style={styles.textInput}
            keyboardType="ascii-capable"
            value={receiverId}
          ></TextInput>
        </View>
        <TouchableOpacity
          onPress={handleSendMoney}
          disabled={disable}
          style={styles.transact}
        >
          <Text style={styles.transactText}>SEND</Text>
        </TouchableOpacity>
        {loader ? <ActivityIndicator size="large" color="#7F5DF0" /> : null}
        <Text style={styles.footMethodText}>Quick Transaction</Text>
        <View style={styles.bubbleBox}>
          <TouchableOpacity
            onPress={() => setQuickAmount("5")}
            style={styles.bubble}
          >
            <Text style={styles.bubbleText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setQuickAmount("10")}
            style={styles.bubble}
          >
            <Text style={styles.bubbleText}>10</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setQuickAmount("20")}
            style={styles.bubble}
          >
            <Text style={styles.bubbleText}>20</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setQuickAmount("50")}
            style={styles.bubble}
          >
            <Text style={styles.bubbleText}>50</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setQuickAmount("100")}
            style={styles.bubble}
          >
            <Text style={styles.bubbleText}>100</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setQuickAmount("200")}
            style={styles.bubble}
          >
            <Text style={styles.bubbleText}>200</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SendMoneyScreen;

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
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 30,
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
  backIcon: {
    position: "absolute",
    top: 50,
    left: 25,
    backgroundColor: COLORS.white,
    borderRadius: 50,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: -20,
  },
  text_footer: {
    marginTop: 8,
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginVertical: 15,
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
    marginTop: 10,
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
  footMethodText: {
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    marginTop: 17,
    marginBottom: 7,
  },
  bubbleBox: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  bubble: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.secondary,
    marginVertical: 8,
    marginHorizontal: 20,
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  bubbleText: {
    color: COLORS.white,
    fontWeight: "700",
  },
  rsuccessTxt: {
    marginBottom: 10,
    textAlign: "center",
    color: COLORS.secondary,
    fontSize: 15,
    fontWeight: "bold",
  },
});
