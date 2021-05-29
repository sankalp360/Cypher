import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import Clipboard from "expo-clipboard";

import * as Animatable from "react-native-animatable";
import { COLORS, SIZES, FONTS } from "../../../config/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import NoticeBox from "../../../components/NoticeBox";

const ReceiveMoneyScreen = ({ navigation, id }) => {
  // const [userId, setUserId] = useState(id);
  const [clip, setClip] = useState(false);

  function copyToClipboard() {
    Clipboard.setString(id);
    setClip(true);
    setTimeout(() => {
      setClip(false);
    }, 800);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backIcon}
          >
            <MaterialCommunityIcons
              style={styles.backInner}
              name="arrow-left"
              color={COLORS.secondary}
              size={30}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.text_header}>Receive Money</Text>
      </View>

      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.footHead}>
            <Text style={styles.footHeadText}>Maximum Transaction Amount:</Text>
            <Text style={styles.footHeadText2}>200.00 CYP</Text>
          </View>
          <Text style={styles.footMethodText}>Your Account Hash Id</Text>
          <Text style={styles.footMethodText2}>{id}</Text>
          {clip ? (
            <Text style={styles.rsuccessTxt}>Copied To Clipboard 📋</Text>
          ) : null}
          <TouchableOpacity onPress={copyToClipboard} style={styles.transact}>
            <Text style={styles.transactText}>COPY</Text>
          </TouchableOpacity>
          <NoticeBox style={{ marginHorizontal: -30 }} />
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default ReceiveMoneyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  iconContainer: {
    height: 150,
    backgroundColor: "#000",
    backgroundColor: COLORS.secondary,
  },
  backIcon: {
    position: "absolute",
    top: 12,
    left: 0,
    backgroundColor: COLORS.white,
    borderRadius: 50,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  footer: {
    flex: 2,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginHorizontal: 10,
  },
  footHead: {
    marginVertical: 12,
  },
  footHeadText: {
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
  },
  footHeadText2: {
    textAlign: "center",
    color: COLORS.secondary,
    fontWeight: "bold",
    fontSize: 25,
  },
  text_footer: {
    marginTop: 8,
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionText: {
    textAlign: "right",
    color: "black",
    width: "20%",
    position: "absolute",
    right: 12,
    fontSize: 20,
    fontWeight: "800",
  },
  banner: {
    marginTop: 2,
    marginHorizontal: 2,
    padding: 10,
    borderRadius: 7,
    backgroundColor: COLORS.secondary,
    opacity: 0.9,
  },
  bannerText: {
    color: COLORS.white,
    marginTop: 8,
    lineHeight: 18,
    ...FONTS.body4,
    marginHorizontal: 8,
  },
  bannerHead: {
    color: COLORS.white,
    ...FONTS.h3,
    marginHorizontal: 8,
  },
  textInput: {
    flex: 1,
    paddingLeft: 15,
    color: "#05375a",
    textAlign: "left",
    fontSize: 17,
    fontWeight: "200",
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  footMethodText: {
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 20,
  },
  footMethodText2: {
    textAlign: "center",
    color: "black",
    marginBottom: 10,
    fontSize: 12,
  },
  transact: {
    backgroundColor: COLORS.secondary,
    marginVertical: 40,
    marginTop: SIZES.padding,
    marginHorizontal: 4,
    padding: 12,
    borderRadius: SIZES.radius - 5,
    elevation: 8,
  },
  transactText: {
    color: COLORS.white,
    fontSize: 18,
    textAlign: "center",
  },
  learnMore: {
    marginTop: SIZES.base,
  },
  learnMoreText: {
    color: "#F0B0F0",
    textDecorationLine: "underline",
    marginHorizontal: 8,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  rsuccessTxt: {
    marginBottom: 10,
    textAlign: "center",
    color: COLORS.secondary,
    fontSize: 15,
    fontWeight: "bold",
  },
});
