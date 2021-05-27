import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import axios from "axios";

import { COLORS } from "../config/theme";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const PortfolioDetailsSection = ({
  base,
  id,
  phone,
  country,
  privateKey,
  getAmount,
}) => {
  const [reveal, setReveal] = useState(false); //*
  const [moneyLoader, setMoneyLoader] = useState(false);
  const [disable, setDisable] = useState(false);
  const [amount, setAmount] = useState(""); //*

  function revealWallet() {
    setDisable(true);
    setMoneyLoader(true);
    axios
      .get(`${base}/getUserDetails/${id}`)
      .then((res) => {
        setAmount(res.data.UserBalance);
        getAmount(res.data.UserBalance);
      })
      .then(() => {
        setReveal(true);
        setMoneyLoader(false);
      })
      .then(() => {
        setTimeout(() => {
          setReveal(false);
          setAmount("");
          getAmount("");
          setDisable(false);
        }, 30000);
      })
      .catch((error) => console.log(error));
  }

  return (
    <View style={styles.textHolder}>
      <Text style={styles.portfolioHeroHeading}>Portfolio Details</Text>
      <View style={styles.basicDetails}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons name="phone" color={COLORS.white} size={30} />
          <Text style={styles.phone}>{phone}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons name="earth" color={COLORS.white} size={30} />
          <Text style={styles.country}>{country}</Text>
        </View>
      </View>
      <Text style={styles.privateKey}>Private Key</Text>
      {reveal ? (
        <View>
          <Text style={styles.privateKeyInner}>{privateKey}</Text>
        </View>
      ) : null}
      {reveal ? (
        <View style={styles.secondaryTextHolder}>
          <Text style={styles.portfolioWorth}>₹{parseInt(amount) * 1}</Text>
          <MaterialCommunityIcons name="chevron-up" color="white" size={30} />
          <Text style={styles.portfolioInvestedValue}>10.25%</Text>
        </View>
      ) : (
        <View style={styles.revealContainer}>
          <TouchableOpacity
            disabled={disable}
            style={styles.revealBox}
            onPress={revealWallet}
          >
            <Text style={styles.revealTxt}>Reveal</Text>
          </TouchableOpacity>
          {moneyLoader ? (
            <ActivityIndicator size="small" color={COLORS.white} />
          ) : null}
        </View>
      )}
    </View>
  );
};

export default PortfolioDetailsSection;

const styles = StyleSheet.create({
  textHolder: {
    display: "flex",
    alignItems: "flex-start",
    marginTop: 25,
    alignSelf: "flex-start",
    backgroundColor: COLORS.primary,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 15,
    elevation: 5,
  },
  portfolioHeroHeading: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  portfolioWorth: {
    color: "#fff",
    fontSize: 20,
    marginRight: 110,
  },
  portfolioInvested: {
    color: "#fff",
    fontSize: 20,
  },
  portfolioInvestedValue: {
    color: "#fff",
    fontSize: 20,
  },
  basicDetails: {
    height: 70,
    alignItems: "flex-start",
    flexDirection: "row",
    marginTop: 10,
  },
  phone: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    marginRight: 30,
    color: COLORS.white,
  },
  country: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
  },
  privateKey: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.white,
    marginTop: -25,
  },
  privateKeyInner: {
    marginTop: 10,
    fontSize: 15,
    color: COLORS.white,
  },
  revealContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  revealBox: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
    marginRight: 10,
  },
  revealTxt: {
    color: COLORS.secondary,
  },
  secondaryTextHolder: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: COLORS.white,
    marginTop: 10,
  },
});
