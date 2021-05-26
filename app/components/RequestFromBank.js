import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { COLORS, SIZES, FONTS } from "../config/theme";

const RequestFromBank = (requestMoney) => {
  const [money, setMoney] = useState("");

  const handleMoneyChange = (val) => {
    setMoney(val);
    console.log(val);
  };

  const getMoney = () => {
    requestMoney(money);
  };

  return (
    <View style={styles.container}>
      <View style={styles.action}>
        <TextInput
          onChangeText={(val) => handleMoneyChange(val)}
          placeholder="Amount in CYP"
          style={styles.textInput}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => getMoney()}>
        <Text style={styles.buttonTxt}>Request CYP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RequestFromBank;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  action: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#513C98",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: COLORS.white,
  },
  textInput: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    fontSize: 15,
    color: "#513C98",
  },
  button: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    elevation: 8,
    marginTop: 15,
    marginBottom: 40,
    backgroundColor: COLORS.secondary,
  },
  buttonTxt: {
    color: COLORS.white,
  },
});
