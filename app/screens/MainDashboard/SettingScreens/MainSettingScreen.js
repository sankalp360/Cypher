import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import firebase from "firebase/app";
import "firebase/auth";

import settings_data from "../../../config/settings_data";
import SettingCard from "../../../components/SettingCard";
import { TouchableOpacity } from "react-native-gesture-handler";

const MainSettingScreen = ({ navigation }) => 
{
    const signOut = () => 
    {
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
            <View style={styles.settingHero}>
                <Text style={styles.settingHeading}>John Doe</Text>
                <Text style={styles.settingId}>
                    0xcd319e22dbc4b55492002d4b116d00d5f6072a61
        </Text>
            </View>


            <View style={styles.settingBody}>
                <SettingCard
                    icon="history"
                    title="History"
                    subtitle="All your transactions on Cypher"
                />
                <SettingCard
                    icon="star-outline"
                    title="Rate Us"
                    subtitle="Tell Us What You Think"
                />
                <SettingCard
                    icon="headset"
                    title="Help & Support"
                    subtitle="Create a ticket and we will contact you"
                />
                <SettingCard icon="android" title="About Cypher" subtitle="v1.0.0" onPress={() => console.log("cypher")} />
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
        },
        signOutBtn: {
            borderColor: "#C0C0C0",
            borderWidth: 1.2,
            width: "85%",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            marginTop: 15,
            borderRadius: 10,
            padding: 24,
        },
        signOutText: {
            fontSize: 16.2,
            fontWeight: "bold",
            color: "#DC143C",
        },
    }
);
