import React, { useState, useEffect } from "react";
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

import axios from "axios";

import { db, fireauth } from "../../config/firebase";

import * as Animatable from "react-native-animatable";
import { COLORS, SIZES } from "../../config/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Coin from "../../components/Coin";
import CypherCoin from "../../components/CypherCoin";
import SearchBox from "../../components/SearchBox";
import LoadingScreen from "../LoadingScreen";

const MarketScreen = ({ navigation, uid }) => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);

  function monitorSearch(childData) {
    setSearch(childData);
  }

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

  const filteredCoins = coins.filter((coin) => {
    return coin.name.toLowerCase().match(search.toLowerCase());
  });

  return (
    <View style={styles.cover}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={styles.container}>
          <StatusBar
            backgroundColor={COLORS.secondary}
            barStyle="light-content"
          />
          <View style={styles.header}>
            <Text style={styles.text_header}>Market</Text>
          </View>

          <SearchBox fetchSearch={monitorSearch} />
          <Animatable.View animation="bounceIn" style={styles.footer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <CypherCoin />
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
          </Animatable.View>
        </View>
      )}
    </View>
  );
};

export default MarketScreen;

const styles = StyleSheet.create({
  cover: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: -20,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 27,
    marginBottom: -20,
  },
  footer: {
    flex: 10,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 15,
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
});
