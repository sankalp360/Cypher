import React,{useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar,
} from "react-native";

import firebase from "firebase/app";
import "firebase/auth";

// import { icons } from "../../config";
import { COLORS, FONTS, SIZES } from "../../config/theme";
import images from "../../config/images";
import { shadow } from "react-native-paper";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import dummyData from "../../config/data";

import { Header } from 'react-native-elements';
import { Colors } from "react-native/Libraries/NewAppScreen";
import icons from "../../config/icons";

import PriceAlert from "../../components/PriceAlert";

const HomeScreen = () => {
  //   firebase gettoken function
  const getToken = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((data) => {
          console.log(data);
        });
      }
    });
  };

  // currencies data baad me api se lena hai
   // build a usestate 
  const [trending, setTrending] = React.useState(dummyData.trendingCurrencies)
  //  dummyData.trendingCurrencies is dummy data of currencies

  // header function
  function renderheader() {

    //this is my flatlist's render function
    const renderItem =({item,index})=>{
      return(
      <TouchableOpacity
        style={{
          width :180,
           paddingVertical:24,
           paddingHorizontal:24,
           backgroundColor:COLORS.white,
           marginLeft:index==0 ? 24: 0,
           marginRight:10,
           borderRadius:10,  
           backgroundColor:COLORS.white           
        }}
      >
      
    {/* Currencies card */}
      <View style={{flexDirection:"row"}}>
           
           {/* <Text>Mohit</Text> */}
           <View> 
           {/* Ye card ke icon wala view hai  */}
             <Image 
                    source={item.image}
                    resizeMode="cover"
                    style={{
                      marginTop:5,
                      width:25,
                      height:25
                    }}
             />
           </View>

           <View style={{marginLeft:8}}>
             <Text style={{...FONTS.h2,fontWeight:"bold"}}>{item.currency}</Text>
             <Text style={{color:COLORS.gray,...FONTS.body3}}>{item.code}</Text>
           </View>
      </View>

      {/* currencyCard ka  VALUE SECTION START */}
      <View style={{marginTop:10}}>
            <Text style={{...FONTS.h4}}>{item.amount}</Text>
            <Text style={{color:item.type == "I" ? COLORS.green :COLORS.red,...FONTS.h5}}>{item.changes}</Text>
      </View>
      </TouchableOpacity>
      )
    }

    //end of renderItem
   
    return (
      <View
        style={{
          width: "100%",
            height: 290,       //height of banner background
          ...styles.shadow
        }}
      >
       {/* //header image */}
        <ImageBackground
          source={images.ban}
          resizeMode="cover"
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >

    {/* //Header Bar */}

          <View
            style={{
              marginTop:44,
              alignItems: "flex-end",
              justifyContent: "center",
              // backgroundColor: "transparent",
              width: "100%",
              // height: 100,
              // marginVertical: 30,
            }}
          >
          <TouchableOpacity
              style={{width:35,height:35,alignItems:"center",justifyContent:'center'}}
           >
           {/* cypher ka logo lgana hai */}
           <Image
                source={icons.notification_white}
                resizeMode="contain"
                style={{flex:1}}
           />
          </TouchableOpacity>            
       </View>

       {/* current Balance data  start*/}
          <View
            style={{alignItems:"center",justifyContent:'center'}}
          >
          <Text style={{ color: "white" ,...FONTS.h3,fontWeight:'bold'}}>Your Current Balance</Text>
            <Text style={{ marginTop:8,color: "white", ...FONTS.h1 }}>RS:1500.00 </Text>
            <Text style={{color:COLORS.white,...FONTS.body5}}>{dummyData.portfolio.changes}  Last 24 Hours</Text>
          </View>

          {/* Scrolling Section */}
           <View
              style={{
                //  height:"40%",
                 position:"absolute",
                 bottom:"-30%",
                //  left:"2%",
                 
              }}
           >
            <Text style={{marginLeft:24,color:"white",fontSize: 22,fontFamily:"Roboto", lineHeight: 30}}>Trending</Text>
            <FlatList 
            contentContainerStyle={{marginTop:8 }}
              data={trending}
              renderItem={renderItem}
              keyExtractor={(item)=>item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
            
           </View>

        </ImageBackground>
      </View>
        //  {/* //end of header image */}
    );
  }
              // end of banner and header section
  
              // start of alert section
              function renderAlert(){
                return(
                  <PriceAlert />
                )
              }

  return (
    <ScrollView>
      <View style={styles.container}>
        {renderheader()}
        {renderAlert()}
        {/* {renderAlert()} */}
        {/* {coinbox()} 
        {coinbox2()}
        {coinbox()}
        {coinbox2()}
        {coinbox()}
        {coinbox2()} */}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    // alignItems: "center",
    // justifyContent: "center",
    paddingBottom: 130,
  },
  coinbox: {
    width: "90%",
    height: 100,
    backgroundColor: COLORS.primary,
    marginVertical: 10,
    marginHorizontal: 20,
    opacity: 0.72,
    borderRadius: SIZES.radius,
  },
  coinbox2: {
    width: "90%",
    height: 100,
    backgroundColor: COLORS.primary,
    marginVertical: 10,
    marginHorizontal: 20,
    opacity: 0.9,
    borderRadius: SIZES.radius,
  },
  messagebox: {
    width: "90%",
    height: 100,
    backgroundColor: COLORS.primary,
    marginVertical: 10,
    marginHorizontal: 20,
    opacity: 0.9,
    borderRadius: SIZES.radius,
  },
});

{
  /* <Button onPress={() => getToken()} title="Get Token" />   
      
                        */
}
// const coinbox = () => {
  //   return <View style={styles.coinbox}></View>;
  // };
  // const coinbox2 = () => {
  //   return <View style={styles.coinbox2}></View>;
  // };
  // const messagebox = () => {
  //   return <View style={styles.messagebox}></View>;
  // };
