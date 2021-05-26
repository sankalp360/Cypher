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
import { LinearGradient } from "expo-linear-gradient";
import { LineChart } from "react-native-chart-kit";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";

//! Configurations
import { db, fireauth } from "../../config/firebase";
import { COLORS } from "../../config/theme";

//! Components
import AssetCard from "../../components/AssetCard";
import NewWallet from "../../components/NewWallet";
import CryptoRequest from "../../components/CryptoRequest";
import DeleteWallet from "../../components/DeleteWallet";
import RequestFromBank from "../../components/RequestFromBank";

const PortfolioScreen = () => {
  const [wallet, setWallet] = useState({
    name: "",
    phone: "",
    country: "",
    walletId: "",
    privateKey: "",
  }); //*

  const [amount, setAmount] = useState("0"); //*
  const [isWallet, setIsWallet] = useState(false); //*
  const [uid, setUid] = useState("ini"); //*
  const [reveal, setReveal] = useState(false); //*
  const [loader, setLoader] = useState(false);
  const [moneyLoader, setMoneyLoader] = useState(false);
  const [money, setMoney] = useState("");
  const [status, setStatus] = useState(false);

  fireauth.onAuthStateChanged((user) => {
    if (user) {
      setUid(user.uid);
    }
  }); //*

  useEffect(() => {
    let docRef = db.collection("wallets").doc(uid); //* Setting Reference variable for the Firestore wallet document associated with the User account.
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setIsWallet(true); //* If Doc Exists Display Portfolio Screen with User Data
          setWallet({
            name: doc.data().name,
            phone: doc.data().phone,
            country: doc.data().country,
            walletId: doc.data().walletId,
            privateKey: doc.data().privateKey,
          }); //* fetching the remote User Wallet data and setting it into the Local State.
        } else {
          console.log("No such document!"); //* doc.data() will be undefined in this case
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [uid, isWallet, wallet]); //* Runs always on these state changes.

  function revealWallet() {
    setMoneyLoader(true);
    axios
      .get(
        `https://cypher-advanced-wallet.herokuapp.com/getUserDetails/${wallet.walletId}`
      )
      .then((res) => {
        setAmount(res.data.UserBalance);
        //console.log(res.data); //-> debugging data coming from the server API
      })
      .then(() => {
        setReveal(true);
        setMoneyLoader(false);
      })
      .then(() => {
        setTimeout(() => {
          setReveal(false);
        }, 8000);
      })
      .catch((error) => console.log(error));
  }

  function handleWallet(childData) {
    setIsWallet(childData); //*
  } //*

  const handleMoneyChange = (val) => {
    setMoney(val);
    console.log(val);
  };

  function handleRequestFromBank() {
    setLoader(true);
    axios
      .post(`https://cypher-advanced-wallet.herokuapp.com/transferFromBank`, {
        UserId: wallet.walletId,
        TransferAmmount: parseInt(money),
      })
      .then(() => {
        setMoney("");
        setLoader(false);
      })
      .then((res) => {
        console.log(res.data);
        setStatus(res.data.status1);
        setTimeout(() => {
          setStatus(false);
        }, 15000);
      })
      .catch((err) => console.log("error: " + err));
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
          <ScrollView showsVerticalScrollIndicator={false}>
            {wallet.walletId ? (
              <Text style={styles.topText}>
                Hi 👋 {wallet.name.split(" ")[0]}
              </Text>
            ) : null}
            {wallet.walletId ? (
              <Text style={styles.portfolioSubHeading}>
                Your portfolio looks great today
              </Text>
            ) : (
              <CryptoRequest />
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
                  yAxisLabel="₹"
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
                  {reveal ? (
                    <View style={styles.secondaryTextHolder}>
                      <Text style={styles.portfolioWorth}>
                        ₹{parseInt(amount) * 1}
                      </Text>
                      <MaterialCommunityIcons
                        name="chevron-up"
                        color="green"
                        size={30}
                      />
                      <Text style={styles.portfolioInvestedValue}>10.25%</Text>
                    </View>
                  ) : (
                    <View style={styles.revealContainer}>
                      <TouchableOpacity
                        style={styles.revealBox}
                        onPress={revealWallet}
                      >
                        <Text style={styles.revealTxt}>Reveal</Text>
                      </TouchableOpacity>
                      {moneyLoader ? (
                        <ActivityIndicator
                          size="small"
                          color={COLORS.primary}
                        />
                      ) : null}
                    </View>
                  )}
                </View>
              </LinearGradient>
            ) : null}
            {wallet.walletId ? (
              <Text style={styles.assets}>Your Assets</Text>
            ) : null}
            {wallet.walletId ? (
              <AssetCard
                icon="alpha-c-circle"
                name="Cypher"
                symbol="CYP"
                change={parseInt(amount).toFixed(0)}
                worth={"₹" + parseInt(amount) * 1}
                changeColor="grey"
                iconName="chevron-up"
              />
            ) : null}
            {wallet.walletId ? (
              <Text style={styles.assets}>Request CYP from Bank</Text>
            ) : null}
            {wallet.walletId ? (
              <View style={styles.rcontainer}>
                {status ? (
                  <Text style={styles.rsuccessTxt}>Money Received 🤑</Text>
                ) : null}
                {loader ? (
                  <ActivityIndicator size="large" color="#7F5DF0" />
                ) : null}
                <View style={styles.raction}>
                  <TextInput
                    onChangeText={(val) => handleMoneyChange(val)}
                    placeholder="Amount in CYP"
                    style={styles.rtextInput}
                    value={money}
                  />
                </View>
                <TouchableOpacity
                  style={styles.rbutton}
                  onPress={handleRequestFromBank}
                >
                  <Text style={styles.rbuttonTxt}>Request CYP</Text>
                </TouchableOpacity>
              </View>
            ) : null}
            {/* {wallet.walletId ? (
              <TouchableOpacity onPress={handleDelete} title="Delete Wallet">
                <DeleteWallet />
              </TouchableOpacity>
            ) : null} */}
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
  revealContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  revealBox: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
    marginRight: 10,
  },
  revealTxt: {
    color: COLORS.white,
  },
});
