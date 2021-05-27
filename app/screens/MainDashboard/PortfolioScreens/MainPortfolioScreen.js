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
} from "react-native";

//! Extra Dependencies
import axios from "axios";

//! Configurations
import { COLORS } from "../../../config/theme";

//! Components
import AssetCard from "../../../components/AssetCard";
import GraphCard from "../../../components/GraphCard";
import NewWallet from "../../../components/NewWallet";
import CryptoRequest from "../../../components/CryptoRequest";
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
      <ImageBackground
        source={require("../../../assets/images/Add_Wallet_Screen_Background.png")}
        style={styles.background}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.topText}>Hi 👋 {name.split(" ")[0]}</Text>
          <Text style={styles.portfolioSubHeading}>
            Your portfolio looks great today
          </Text>
          <GraphCard />
          <PortfolioDetailsSection
            base={base}
            id={id}
            phone={phone}
            country={country}
            privateKey={privateKey}
            getAmount={fetchAmount}
          />
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
          {/* {wallet.walletId ? (
              <TouchableOpacity onPress={handleDelete} title="Delete Wallet">
                <DeleteWallet />
              </TouchableOpacity>
            ) : null} */}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default MainPortfolioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
  },
  portfolioHeading: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
  },
  topText: {
    fontSize: 30,
    marginTop: 40,
    color: "black",
    fontWeight: "bold",
  },
  portfolioSubHeading: {
    fontSize: 16,
    color: "grey",
  },
  assets: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: "bold",
  },
  coinbox: {
    width: "90%",
    height: 80,
    backgroundColor: "#FFF",
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 15,
  },
  moreAssets: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 15,
  },
  moreAssetsText: {
    textDecorationLine: "underline",
    color: "#513C98",
    fontWeight: "600",
    fontSize: 15,
  },
  rcontainer: {
    flex: 1,
  },
  raction: {
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
  rtextInput: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    fontSize: 15,
    color: "#513C98",
  },
  rbutton: {
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
  rbuttonTxt: {
    color: COLORS.white,
  },
  rsuccessTxt: {
    marginBottom: 10,
    textAlign: "center",
    color: COLORS.secondary,
    fontSize: 15,
    fontWeight: "bold",
  },
});
