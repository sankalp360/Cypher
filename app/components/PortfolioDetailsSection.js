import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import axios from "axios";

import * as Animatable from "react-native-animatable";

import { COLORS, SIZES } from "../config/theme";

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
    <Animatable.View animation="bounceIn" style={styles.textHolder}>
      <Text style={styles.portfolioHeroHeading}>Portfolio Details</Text>
      <View style={styles.basicDetails}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="phone"
            color={COLORS.secondary}
            size={30}
          />
          <Text style={styles.phone}>{phone}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="earth"
            color={COLORS.secondary}
            size={30}
          />
          <Text style={styles.country}>{country}</Text>
        </View>
      </View>
      <Text style={styles.privateKey}>Private Key</Text>
      {reveal ? (
        <View>
          <Text style={styles.privateKeyInner}>{privateKey}</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.privateKeyInner}>Hidden</Text>
        </View>
      )}
      <View style={styles.secondaryTextHolder}>
        <Text style={styles.portfolioInvestedValue}>Your Balance</Text>
      </View>
      {reveal ? (
        <View style={styles.secondaryTextHolder}>
          <Text style={styles.portfolioWorth}>₹{parseInt(amount) * 1}</Text>
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
        </View>
      )}
      {moneyLoader ? (
        <View
          style={{ width: "100%", justifyContent: "center", marginTop: 10 }}
        >
          <ActivityIndicator size="small" color={COLORS.secondary} />
        </View>
      ) : null}
    </Animatable.View>
  );
};

export default PortfolioDetailsSection;

const styles = StyleSheet.create({
  textHolder: {
    display: "flex",
    alignItems: "flex-start",
    marginTop: 25,
    alignSelf: "flex-start",
    backgroundColor: COLORS.white,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 15,
    elevation: 5,
  },
  portfolioHeroHeading: {
    color: COLORS.black,
    fontSize: 20,
    fontWeight: "bold",
  },
  portfolioWorth: {
    color: COLORS.secondary,
    fontSize: 15,
  },
  portfolioInvestedValue: {
    color: COLORS.black,
    fontSize: 15,
    marginRight: 30,
    fontWeight: "bold",
  },
  basicDetails: {
    height: 70,
    alignItems: "flex-start",
    flexDirection: "row",
    marginTop: 10,
  },
  phone: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
    marginRight: 90,
    color: COLORS.secondary,
  },
  country: {
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.secondary,
  },
  privateKey: {
    fontSize: 15,
    fontWeight: "bold",
    color: COLORS.black,
    marginTop: -25,
  },
  privateKeyInner: {
    fontSize: 15,
    color: COLORS.secondary,
  },
  revealContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  revealBox: {
    width: "100%",
    backgroundColor: COLORS.secondary,
    marginTop: 10,
    marginHorizontal: 4,
    padding: 12,
    borderRadius: SIZES.radius - 5,
    elevation: 8,
  },
  revealTxt: {
    color: COLORS.white,
    fontSize: 18,
    textAlign: "center",
  },
  secondaryTextHolder: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: COLORS.secondary,
    marginTop: 10,
  },
});
