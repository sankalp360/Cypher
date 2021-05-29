//! Basic Dependencies
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  StatusBar,
} from "react-native";

import * as Animatable from "react-native-animatable";

//! Extra Dependencies
import axios from "axios";

//! Configurations
import { COLORS } from "../../../config/theme";

//! Components
import AssetCard from "../../../components/AssetCard";
import GraphCard from "../../../components/GraphCard";
import DeleteWallet from "../../../components/DeleteWallet";
import PortfolioDetailsSection from "../../../components/PortfolioDetailsSection";

const MainPortfolioScreen = ({
  navigation,
  base,
  id,
  name,
  phone,
  country,
  privateKey,
}) => {
  const [amount, setAmount] = useState(""); //*

  function fetchAmount(childData) {
    setAmount(childData);
  }

  //   function handleDelete() {
  //     db.collection("wallets")
  //       .doc(uid)
  //       .delete()
  //       .then(() => {
  //         setIsWallet(false);
  //         console.log("Document successfully deleted!");
  //       })
  //       .catch((error) => {
  //         console.error("Error removing document: ", error);
  //       });
  //   }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Hi 👋 {name.split(" ")[0]}</Text>
        <Text style={styles.portfolioSubHeading}>
          Your portfolio looks great today
        </Text>
        <PortfolioDetailsSection
          base={base}
          id={id}
          phone={phone}
          country={country}
          privateKey={privateKey}
          getAmount={fetchAmount}
        />
      </View>
      <Animatable.View animation="fadeInUp" style={styles.footer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <GraphCard />
          <Text style={styles.assets}>Your Assets</Text>
          <AssetCard
            icon="alpha-c-circle"
            name="Cypher"
            symbol="CYP"
            change={amount}
            worth={amount}
            changeColor="grey"
            iconName="chevron-up"
          />
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default MainPortfolioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.secondary,
    flex: 7,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 15,
    marginTop: -20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  text_header: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 27,
    marginBottom: -20,
  },
  portfolioSubHeading: {
    fontSize: 16,
    color: COLORS.white,
    marginTop: 20,
    marginBottom: -5,
  },
  footer: {
    flex: 6,
    backgroundColor: COLORS.white,
    paddingTop: 15,
  },
  assets: {
    fontSize: 18,
    marginTop: 10,
    marginLeft: 10,
    fontWeight: "bold",
    color: COLORS.black,
  },
});
