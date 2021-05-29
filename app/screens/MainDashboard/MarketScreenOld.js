import React, { useState, useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import axios from "axios";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import Coin from "../../components/Coin";

import LoadingScreen from "../LoadingScreen";

import { COLORS } from "../../config/theme";

function MarketScreenOld() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=50&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        setLoading(false);
        //* console.log(res.data); -> debugging data coming from the server API
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (val) => {
    setSearch(val);
    //* console.log(filteredCoins);  -> Debugging filteredCoins coming after search
  };

  const filteredCoins = coins.filter((coin) => {
    return coin.name.toLowerCase().match(search.toLowerCase());
  });

  return (
    <View style={styles.cover}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <ImageBackground
          source={require("../../assets/images/Add_Wallet_Screen_Background.png")}
          style={styles.background}
        >
          <ScrollView data={coins} style={styles.container}>
            <Text style={styles.marketHeading}>Market</Text>
            <View style={styles.coinSearch}>
              <TextInput
                placeholderTextColor="#fff"
                style={styles.textIn}
                onChangeText={(val) => handleChange(val)}
                placeholder="Search For A Currency.."
              />
              <MaterialCommunityIcons
                name="magnify"
                color={COLORS.white}
                size={27}
              />
            </View>
            <TouchableOpacity style={styles.coinContainer}>
              <View style={styles.coinRow}>
                <Image
                  resizeMode="contain"
                  style={styles.crypto}
                  source={require("../../assets/images/cypher.png")}
                />
                <View style={styles.coin}>
                  <Text style={styles.name}>Cypher</Text>
                  <Text style={styles.coinSymbol}>CYP</Text>
                </View>
                <View style={styles.coinData}>
                  <Text style={styles.coinPrice}>₹1.00</Text>
                  <Text style={styles.coinPercentGreen}>Gain: 0.00%</Text>
                </View>
              </View>
            </TouchableOpacity>
            {filteredCoins.map((coin) => {
              return (
                <Coin
                  key={coin.id}
                  name={coin.name}
                  image={coin.image}
                  symbol={coin.symbol}
                  price={coin.current_price}
                  priceChange={coin.price_change_percentage_24h}
                />
              );
            })}
          </ScrollView>
        </ImageBackground>
      )}
    </View>
  );
}

export default MarketScreenOld;

const styles = StyleSheet.create({
  cover: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "#f0f0f0",
  },
  marketHeading: {
    marginTop: 20,
    fontSize: 26,
    fontWeight: "bold",
  },
  coinSearch: {
    flex: 1,
    width: "100%",
    height: 60,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 10,
    borderRadius: 10,
  },
  coinText: {
    padding: 10,
    justifyContent: "center",
  },
  textIn: {
    height: 40,
    width: "83%",
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1,
    borderRadius: 10,
    color: COLORS.white,
    marginRight: 5,
    paddingHorizontal: 10,
  },
  coinContainer: {
    flex: 1,
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    height: 60,
  },
  coinRow: {
    flex: 1,
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  crypto: {
    height: 40,
    width: 40,
  },
  coin: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
  },
  coinSymbol: {
    textTransform: "uppercase",
  },
  coinData: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  coinPrice: {
    fontSize: 15,
    fontWeight: "600",
  },
  coinPercentRed: {
    color: "red",
  },
  coinPercentGreen: {
    color: "green",
  },
});
