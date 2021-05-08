import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { LineChart } from "react-native-chart-kit";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const PortfolioScreen = () => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.portfolioHeading}>Portfolio</Text> */}
      <Text style={styles.topText}>Hi John</Text>
      <Text style={styles.portfolioSubHeading}>
        Your portfolio looks great today
      </Text>
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
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
            <Text style={styles.portfolioHeroHeading}>Portfolio Value</Text>
          </View>
          <View style={styles.secondaryTextHolder}>
            {/* <Text style={styles.portfolioInvested}>Profit</Text>
            <Text style={styles.portfolioInvestedValue}>18.55%</Text> */}
            <Text style={styles.portfolioWorth}>$80,000</Text>
            <MaterialCommunityIcons name="chevron-up" color="green" size={30} />
            <Text style={styles.portfolioInvestedValue}>18.55%</Text>
          </View>
        </View>
      </LinearGradient>
      <Text style={styles.assets}>Your Assets</Text>
      <View style={styles.coinbox}></View>
      <View style={styles.coinbox}></View>
      <TouchableOpacity style={styles.moreAssets}>
        <Text style={styles.moreAssetsText}>More Assets</Text>
        <MaterialCommunityIcons name="chevron-right" color="blue" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default PortfolioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: "blue",
    fontWeight: "600",
    fontSize: 15,
  },
});
