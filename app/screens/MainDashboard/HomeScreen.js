import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar,
} from "react-native";

import { COLORS, FONTS } from "../../config/theme";
import images from "../../config/images";
import dummyData from "../../config/data";
import icons from "../../config/icons";

import PriceAlert from "../../components/PriceAlert";
import NoticeBox from "../../components/NoticeBox";
import axios from "axios";

const HomeScreen = () => {
  BaseURL = "https://cypher-advanced-wallet.herokuapp.com";

  const [bankWorth, setBankWorth] = useState("100000000000000000000000000");

  useEffect(() => {
    axios
      .get(`${BaseURL}/getBankDetails`)
      .then((res) => {
        setBankWorth(res.data.TotalSupply);
      })
      .catch((err) => console.log("error: " + err));
  }, []);

  const formatToCurrency = (amount) => {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  // currencies data baad me api se lena hai
  // build a usestate
  const [trending, setTrending] = useState(dummyData.trendingCurrencies);
  //  dummyData.trendingCurrencies is dummy data of currencies

  // header function
  function renderheader() {
    //this is my flatlist's render function
    const renderItem = ({ item, index }) => {
      return (
        <TouchableOpacity
          style={{
            width: 180,
            paddingVertical: 24,
            paddingHorizontal: 24,
            backgroundColor: COLORS.white,
            marginLeft: index == 0 ? 24 : 0,
            marginRight: 10,
            borderRadius: 10,
            backgroundColor: COLORS.white,
          }}
          // onPress={()=> navigation.navigate('MarketScreen')}
        >
          {/* Currencies card */}
          <View style={{ flexDirection: "row" }}>
            <View>
              {/* Ye card ke icon wala view hai  */}
              <Image
                source={item.image}
                resizeMode="cover"
                style={{
                  marginTop: 5,
                  width: 25,
                  height: 25,
                }}
              />
            </View>

            <View style={{ marginLeft: 8 }}>
              <Text style={{ ...FONTS.h2, fontWeight: "bold" }}>
                {item.currency}
              </Text>
              <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>
                {item.code}
              </Text>
            </View>
          </View>

          {/* currencyCard ka  VALUE SECTION START */}
          <View style={{ marginTop: 10 }}>
            <Text style={{ ...FONTS.h4 }}>{item.amount}</Text>
            <Text
              style={{
                color: item.type == "I" ? COLORS.green : COLORS.red,
                ...FONTS.h5,
              }}
            >
              {item.changes}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    //end of renderItem

    return (
      <View
        style={{
          width: "100%",
          height: 300, //height of banner background
          ...styles.shadow,
        }}
      >
        {/* //header image */}
        <ImageBackground
          source={images.ban}
          resizeMode="cover"
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          {/* //Header Bar */}

          <View
            style={{
              marginTop: 40,
              alignItems: "flex-end",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <TouchableOpacity
              style={{
                width: 35,
                height: 35,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* cypher ka logo lgana hai */}
              <Image
                source={icons.notification_white}
                resizeMode="contain"
                style={{ flex: 1 }}
              />
            </TouchableOpacity>
          </View>

          {/* current Balance data  start*/}
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text
              style={{
                color: "white",
                ...FONTS.h2,
                fontWeight: "bold",
              }}
            >
              Cypher Bank Balance
            </Text>
            <Text style={{ marginTop: 10, color: "white", ...FONTS.h3 }}>
              {formatToCurrency(parseInt(bankWorth) / 10000000000000000000)}
              {" CYP "}
            </Text>
            <Text style={{ color: COLORS.white, ...FONTS.body5 }}>
              {dummyData.portfolio.changes} Last 24 Hours
            </Text>
          </View>
        </ImageBackground>
        {/* Scrolling Section */}
        <View
          style={{
            //  height:"40%",
            position: "absolute",
            bottom: "-30%",
            //  left:"2%",
          }}
        >
          <Text
            style={{
              marginLeft: 24,
              color: "white",
              fontSize: 22,
              fontFamily: "Roboto",
              lineHeight: 30,
            }}
          >
            Trending
          </Text>
          <FlatList
            contentContainerStyle={{ marginTop: 8 }}
            data={trending}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
      //  {/* //end of header image */}
    );
  }

  return (
    <ScrollView style={styles.container}>
      {renderheader()}
      <PriceAlert />
      <View style={{ paddingHorizontal: 20 }}>
        <NoticeBox />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});
