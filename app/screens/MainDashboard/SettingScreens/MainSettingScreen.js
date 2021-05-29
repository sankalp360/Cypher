import React from "react";
import { StyleSheet, Text, View, Linking } from "react-native";

import firebase from "firebase/app";
import "firebase/auth";

import settings_data from "../../../config/settings_data";
import SettingCard from "../../../components/SettingCard";
import { TouchableOpacity } from "react-native-gesture-handler";

import * as Animatable from "react-native-animatable";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS, SIZES } from "../../../config/theme";
import { ScrollView } from "react-native";

const MainSettingScreen = ({ navigation, name, senderId, phone }) => {
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Signed Out Successfully");
      })
      .catch((error) => {
        console.out(error);
      });
  };

  return (
    <View style={styles.container}>
      {/* header  Section*/}
      <View style={styles.header}>
        <Text style={styles.text_header}>{name}</Text>
        <Text style={styles.settingSubHeading2}>
          {"+91 "}
          {phone}
        </Text>
        {/* <Text style={styles.settingSubHeading}>{senderId}</Text> */}
      </View>

      {/* header  Section*/}

      <Animatable.View animation="fadeInUp" style={styles.footer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://google.com")}
          >
            <SettingCard
              icon="star-outline"
              title="Rate Us"
              subtitle="Tell Us What You Think"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL("https://google.com")}
          >
            <SettingCard
              icon="headset"
              title="Help & Support"
              subtitle="Create a ticket and we will contact you"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("About")}>
            <SettingCard
              icon="android"
              title="About Cypher"
              subtitle="v1.0.0"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => signOut()} title="Sign Out">
            <View style={styles.signOutBtn}>
              <Text style={styles.signOutText}>Sign Out</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default MainSettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.secondary,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    marginTop: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  text_header: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 30,
  },
  settingSubHeading: {
    fontSize: 13,
    color: COLORS.white,
    marginTop: 15,
  },
  settingSubHeading2: {
    fontSize: 18,
    color: COLORS.white,
    marginTop: 10,
  },
  signOutBtn: {
    width: "90%",
    height: 60,
    justifyContent: "center",
    backgroundColor: COLORS.secondary,
    marginVertical: 20,
    marginHorizontal: 10,
    alignSelf: "center",
    padding: 12,
    borderRadius: SIZES.radius - 5,
    elevation: 8,
  },
  signOutText: {
    color: COLORS.white,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  footer: {
    flex: 2,
    backgroundColor: COLORS.white,
    paddingTop: 10,
  },
});
