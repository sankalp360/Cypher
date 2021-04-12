import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import firebase from "firebase";
import "firebase/auth";

import fireapp from "../../config/firebase";


const HomeScreen = () => {
  const getToken = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((data) => {
          console.log(data);
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      <Button onPress={() => getToken()} title="Get Token" />                    
     
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
