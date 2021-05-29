import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { LineChart } from "react-native-chart-kit";

const GraphCard = () => {
  return (
    <LinearGradient colors={["#FFF", "#FFF"]} style={styles.portfolioHero}>
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
          backgroundGradientFrom: "#5D2DFD",
          backgroundGradientTo: "#21008F",
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
          borderRadius: 10,
        }}
      />
    </LinearGradient>
  );
};

export default GraphCard;

const styles = StyleSheet.create({
  portfolioHero: {
    height: 200,
    marginTop: 15,
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    marginHorizontal: 25,
  },
});
