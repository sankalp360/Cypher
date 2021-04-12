import React, { useState, useEffect } from "react";

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
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (val) => {
    setSearch(val);
  };

  const filteredCoins = coins.filter((coin) => {
    coin.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <ScrollView data={coins} style={styles.container}>
      <View style={styles.coinSearch}>
        <Text style={styles.coinText}>Search A Currency</Text>
        <TextInput
          onChangeText={(val) => handleChange(val)}
          placeholder="Search..."
        />
      </View>
      {coins.map((coin) => {
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
    width: "100%",
    height: 70,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  coinText: {
    padding: 10,
    alignItems: "center",
  },
});
