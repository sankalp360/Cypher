import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import firebase from "firebase/app";
import "firebase/auth";

import settings_data from "../../../config/settings_data";
import SettingCard from "../../../components/SettingCard";
import { TouchableOpacity } from "react-native-gesture-handler";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { COLORS } from "../../../config/theme";

const MainSettingScreen = ({ navigation }) => {
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
            <View style={styles.settingHero}>
                <Text style={styles.settingHeading}>Mohit Vishwakarma</Text>
                <Text style={styles.settingId}>    0xcd319e22dbc4b55492002d4b116d00d5f6072a61 </Text>
            </View>
    
           {/* header  Section*/}

            <View style={styles.settingBody}>
            <TouchableOpacity onPress={() => Linking.openURL('https://google.com')}>
                <SettingCard
                    icon="star-outline"
                    title="Rate Us"
                    subtitle="Tell Us What You Think"
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://google.com')}> 
                <SettingCard
                    icon="headset"
                    title="Help & Support"
                    subtitle="Create a ticket and we will contact you"
                />
                </TouchableOpacity>   
                <TouchableOpacity onPress={() => navigation.navigate('About')}>
                    <SettingCard icon="android" title="About Cypher" subtitle="v1.0.0" />
                </TouchableOpacity>
                
            </View>

            <TouchableOpacity onPress={() => signOut()} title="Sign Out">
                <View style={styles.signOutBtn}>
                    <Text style={styles.signOutText}>Sign Out</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default MainSettingScreen;

const styles = StyleSheet.create
    (
        {
            container: {
                flex: 1,
                backgroundColor: "#F8F8F8",
                marginTop: 35,
                height: "100%",
            },
            settingHero: {
                height: "20%",
                alignItems: "center",
                marginVertical:10,
            },
            settingHeading: {
                fontSize: 32,
                fontWeight: "bold",
                marginVertical: 15,
            },
            settingId: {
                color: "grey",
                fontSize: 13.5,
            },
            settingBody: {
                height: "60%",
                backgroundColor: "#F5F5F5",
                marginTop:30,
            },
            aboutcontainer: {
                flex: 1,
                backgroundColor: "#fff",
                marginBottom: 4,
                flexDirection: "row",
                padding: 20,

            },
            icon: {
                marginRight: 30,
                alignItems: "center",
                justifyContent: "center",
            },
            title: {
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 8,
            },
            subtitle: {
                fontSize: 15,
                color: "grey",
            },
            signOutBtn: {
                backgroundColor:COLORS.secondary,
                width: "90%",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
                
                borderRadius: 20,
                padding: 12,
                
            },
            signOutText: {
                fontSize: 22,
                fontWeight: "bold",
                color: COLORS.white,
            },
        }
    );
