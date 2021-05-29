import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { COLORS } from "../config/theme";

const SettingCard = ({ icon, title, subtitle }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.icon}>
        <MaterialCommunityIcons
          name={icon}
          color={COLORS.secondary}
          size={30}
        />
      </View>
      <View style={styles.Content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SettingCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 8,
    marginHorizontal:8,
    marginTop:8,
    flexDirection: "row",
    padding: 50,
    height: "10%",
    alignContent:'center',
    borderRadius:20,
    
      shadowColor:"#000",
      shadowOffset:{
          width:0,
          height:4
      },
      shadowOpacity:0.30,
      shadowRadius:4.8,

      elevation: 8,
  
    
  },
  icon: {
    marginRight: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  Content: {
    marginRight: 30,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: "grey",
  },
});
