import React, { useState, useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import axios from "axios";

import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import Coin from "../../components/Coin";

function MarketScreen() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=50&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
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
    <ScrollView data={coins} style={styles.container}>
      <View style={styles.coinSearch}>
        <TextInput
          style={styles.textIn}
          onChangeText={(val) => handleChange(val)}
          placeholder="Search For A Currency.."
        />
        <MaterialCommunityIcons name="magnify" color="#444" size={27} />
      </View>
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
  );
}

export default MarketScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  coinSearch: {
    flex: 1,
    width: "100%",
    height: 70,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  coinText: {
    padding: 10,
    justifyContent: "center",
  },
  textIn: {
    height: 30,
    width: "90%",
    borderColor: "grey",
    borderWidth: 1,
    backgroundColor: "#dcdcdc",
    borderRadius: 10,
    color: "black",
    marginRight: 5,
    paddingHorizontal: 10
  },
});
