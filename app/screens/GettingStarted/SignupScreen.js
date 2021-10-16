import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  TextInput,
  ActivityIndicator,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Animatable from "react-native-animatable";

import { COLORS } from "../../config/theme";

import fireapp from "../../config/firebase";

const SignupScreen = ({ navigation }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirm_password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    isValidEmail: true,
  });

  const [loader, setLoader] = useState(false);

  const textInputChange = (val) => {
    if (val.length === 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    }
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirm_password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  const handleSignup = () => {
    setLoader(true);
    let email = data.email;
    let password = data.password;
    fireapp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => navigation.navigate("Dashboard"))
      .catch((error) => {
        setLoader(false)
        setData({ ...data, isValidEmail: false })
        });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        {loader ? (
          <ActivityIndicator size="large" color={COLORS.secondary} />
        ) : null}
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <MaterialCommunityIcons name="email" color="#05375a" size={20} />
          <TextInput
            onChangeText={(val) => textInputChange(val)}
            placeholder="Your Email"
            style={styles.textInput}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <MaterialCommunityIcons
                name="check-circle"
                color="green"
                size={20}
              />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidEmail ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Invalid Email</Text>
          </Animatable.View>
        )}
        <Text style={([styles.text_footer], { marginTop: 35 })}>Password</Text>
        <View style={styles.action}>
          <MaterialCommunityIcons name="lock" color="#05375a" size={20} />
          <TextInput
            onChangeText={(val) => handlePasswordChange(val)}
            placeholder="Password"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <MaterialCommunityIcons name="eye-off" color="grey" size={20} />
            ) : (
              <MaterialCommunityIcons name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        <Text style={([styles.text_footer], { marginTop: 35 })}>
          Confirm Password
        </Text>
        <View style={styles.action}>
          <MaterialCommunityIcons name="lock" color="#05375a" size={20} />
          <TextInput
            onChangeText={(val) => handleConfirmPasswordChange(val)}
            placeholder="Confirm Password"
            secureTextEntry={data.confirm_secureTextEntry ? true : false}
            style={styles.textInput}
          />
          <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
            {data.confirm_secureTextEntry ? (
              <MaterialCommunityIcons name="eye-off" color="grey" size={20} />
            ) : (
              <MaterialCommunityIcons name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signUpWrapper}
            onPress={() => handleSignup()}
          >
            <LinearGradient
              colors={["#5D2DFD", "#21008F"]}
              style={styles.signUp}
            >
              <Text style={styles.textSign}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.signIn}
          >
            <Text style={[styles.textSign, { color: "#21008F" }]}>Login</Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignupScreen;

//* Styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signUpWrapper: {
    width: '100%'
  },
  signUp: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#21008F",
    borderWidth: 1,
    marginTop: 15,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  errorMsg: {
    color: "red",
    fontSize: 12,
  },
});
