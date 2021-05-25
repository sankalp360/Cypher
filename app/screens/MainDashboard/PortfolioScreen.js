import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { LineChart } from "react-native-chart-kit";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AssetCard from "../../components/AssetCard";
import NewWallet from "../../components/NewWallet";

import { db, fireauth } from "../../config/firebase";

const PortfolioScreen = () => {
  const [wallet, setWallet] = useState({
    name: "",
    phone: "",
    country: "",
    walletId: "",
  });

  const [isWallet, setIsWallet] = useState(false);

  const [uid, setUid] = useState("ini");

  fireauth.onAuthStateChanged((user) => {
    if (user) {
      setUid(user.uid);
    }
  });

  useEffect(() => {
    let docRef = db.collection("wallets").doc(uid);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setIsWallet(true);
          setWallet({
            name: doc.data().name,
            phone: doc.data().phone,
            country: doc.data().country,
            walletId: doc.data().walletId,
          });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [uid, isWallet, wallet]);

  function handleWallet(childData) {
    setIsWallet(childData);
  }

  function handleCryptoAccess() {
    db.collection("wallets")
      .doc(uid)
      .set({
        name: wallet.name,
        phone: wallet.phone,
        country: wallet.country,
        walletId: "0xcd319e22dbc4b55492002d4b116d00d5f6072a61",
      })
      .then(() => {
        console.log("document written");
      })
      .catch((err) => console.log(err.message));
  }

  function handleDelete() {
    db.collection("wallets")
      .doc(uid)
      .delete()
      .then(() => {
        setIsWallet(false);
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/Add_Wallet_Screen_Background.png")}
        style={styles.background}
      >
        {isWallet ? (
          <ScrollView>
            {wallet.walletId ? (
              <Text style={styles.topText}>{wallet.name}</Text>
            ) : null}
            {wallet.walletId ? (
              <Text style={styles.portfolioSubHeading}>
                Your portfolio looks great today
              </Text>
            ) : (
              <View>
                <Text style={styles.hiddenText}>Just One More Step</Text>
                <TouchableOpacity
                  style={styles.cryptoAccess}
                  onPress={handleCryptoAccess}
                >
                  <Text style={styles.cryptoAccessText}>
                    Crypto Access Request
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {wallet.walletId ? (
              <LinearGradient
                // colors={["#7F5DF0", "#513C98"]}
                colors={["#FFF", "#FFF"]}
                style={styles.portfolioHero}
              >
                <LineChart
                  data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                    datasets: [
                      {
                        data: [0, 0, 72, 65, 78, 80],
                      },
                    ],
                  }}
                  width={Dimensions.get("window").width * 0.8} // from react-native
                  height={180}
                  yAxisLabel="$"
                  yAxisSuffix="k"
                  yAxisInterval={1} // optional, defaults to 1
                  chartConfig={{
                    backgroundColor: "#7F5DF0",
                    backgroundGradientFrom: "#7F5DF0",
                    backgroundGradientTo: "#513C98",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) =>
                      `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 10,
                    },
                    propsForDots: {
                      r: "2",
                      strokeWidth: "1",
                      stroke: "#ffa726",
                    },
                  }}
                  bezier
                  style={{
                    marginVertical: -10,
                    borderRadius: 10,
                  }}
                />
                <View style={styles.textHolder}>
                  <View style={styles.mainTextHolder}>
                    <Text style={styles.portfolioHeroHeading}>
                      Portfolio Value
                    </Text>
                  </View>
                  <View style={styles.secondaryTextHolder}>
                    {/* <Text style={styles.portfolioInvested}>Profit</Text>
            <Text style={styles.portfolioInvestedValue}>18.55%</Text> */}
                    <Text style={styles.portfolioWorth}>$80,000</Text>
                    <MaterialCommunityIcons
                      name="chevron-up"
                      color="green"
                      size={30}
                    />
                    <Text style={styles.portfolioInvestedValue}>18.55%</Text>
                  </View>
                </View>
              </LinearGradient>
            ) : null}
            {wallet.walletId ? (
              <Text style={styles.assets}>Your Assets</Text>
            ) : null}
            {wallet.walletId ? (
              <AssetCard
                icon="bitcoin"
                name="Bitcoin"
                symbol="BTC"
                worth="$70,000"
                change="10.25%"
                changeColor="green"
                iconName="chevron-up"
              />
            ) : null}
            {/* {wallet.walletId ? (
              <AssetCard
                icon="ethereum"
                name="Ethereum"
                symbol="ETH"
                worth="$10,000"
                change="2.65%"
                changeColor="red"
                iconName="chevron-down"
              />
            ) : null} */}
            {/* <TouchableOpacity style={styles.moreAssets}>
            <Text style={styles.moreAssetsText}>More Assets</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              color="#513C98"
              size={20}
            />
          </TouchableOpacity> */}
            {wallet.walletId ? (
              <TouchableOpacity onPress={handleDelete} title="Delete Wallet">
                <View style={styles.deleteWalletBtn}>
                  <Text style={styles.deleteWalletText}>Delete Wallet</Text>
                </View>
              </TouchableOpacity>
            ) : null}
          </ScrollView>
        ) : (
          <NewWallet uid={uid} isWallet={handleWallet} />
        )}
      </ImageBackground>
    </View>
  );
};

export default PortfolioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  portfolioHeading: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
  },
  topText: {
    fontSize: 30,
    marginTop: 30,
    color: "black",
    fontWeight: "bold",
  },
  hiddenText: {
    fontSize: 30,
    marginTop: 250,
    textAlign: "center",
  },
  cryptoAccess: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#513C98",
    marginVertical: 100,
    backgroundColor: "#7F5DF0",
  },
  cryptoAccessText: {
    fontWeight: "bold",
    color: "#fff",
  },
  portfolioSubHeading: {
    fontSize: 16,
    color: "grey",
  },
  portfolioHero: {
    height: 280,
    marginTop: 15,
    borderRadius: 15,
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
  textHolder: {
    display: "flex",
    alignItems: "flex-start",
    marginTop: 25,
    alignSelf: "flex-start",
  },
  mainTextHolder: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  secondaryTextHolder: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: "#000",
  },
  portfolioHeroHeading: {
    color: "#000",
    fontSize: 20,
  },
  portfolioWorth: {
    color: "#000",
    fontSize: 20,
    marginRight: 110,
  },
  portfolioInvested: {
    color: "#000",
    fontSize: 20,
  },
  portfolioInvestedValue: {
    color: "green",
    fontSize: 20,
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
  deleteWalletBtn: {
    borderColor: "#DC143C",
    borderWidth: 1.2,
    backgroundColor: "#fff",
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 15,
    borderRadius: 10,
    padding: 24,
  },
  deleteWalletText: {
    fontSize: 16.2,
    fontWeight: "bold",
    color: "#DC143C",
  },
});
