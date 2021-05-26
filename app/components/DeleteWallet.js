import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DeleteWallet = () => {
  return (
    <View style={styles.deleteWalletBtn}>
      <Text style={styles.deleteWalletText}>Delete Wallet</Text>
    </View>
  );
};

export default DeleteWallet;

const styles = StyleSheet.create({
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
