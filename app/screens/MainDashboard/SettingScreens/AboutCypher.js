import React from 'react'
import { View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    StatusBar,
    ScrollView,} from 'react-native'

    import { LinearGradient } from "expo-linear-gradient";
    import * as Animatable from "react-native-animatable";
    import { COLORS, SIZES } from "../../../config/theme";
    import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
    
    

const AboutCypher = ({ navigation }) => {
    return (
        <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.secondary} barStyle="light-content" />
      <View style={styles.header}>
      <TouchableOpacity
          onPress={()=>navigation.navigate("Main")}
          style={styles.backIcon}
        >
          <MaterialCommunityIcons
            style={styles.backInner}
            name="arrow-left"
            color={COLORS.secondary}
            size={30}
          />
        </TouchableOpacity>
        <Text style={styles.text_header}>About US!</Text>
      </View>

      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <View style={styles.footHead}>
          <Text style={styles. HeadNameText}>Cypher</Text>
          <Text style={styles.SubHeadNameText}>Advance CryptoWallet App</Text>
           
        </View>
       
       
        <ScrollView style={styles.Body} >
        <View >
          <Text style={styles. BodyText}>Bishop’s much loved and much discussed ode to loss, which Claudia Roth Pierpont called “a triumph of control, understatement, wit. Even of self-mockery, in the poetically pushed rhyme word “vaster,” and the ladylike, pinkies-up “shan’t.” An exceedingly rare mention of her mother—as a woman who once owned a watch. A continent standing in for losses larger than itself.”</Text>
          
          <Text style={styles. BodyText}>Bishop’s much loved and much discussed ode to loss, which Claudia Roth Pierpont called “a triumph of control, understatement, wit. Even of self-mockery, in the poetically pushed rhyme word “vaster,” and the ladylike, pinkies-up “shan’t.” An exceedingly rare mention of her mother—as a woman who once owned a watch. A continent standing in for losses larger than itself.”</Text>
          
          <Text style={styles. BodyText}>Bishop’s much loved and much discussed ode to loss, which Claudia Roth Pierpont called “a triumph of control, understatement, wit. Even of self-mockery, in the poetically pushed rhyme word “vaster,” and the ladylike, pinkies-up “shan’t.” An exceedingly rare mention of her mother—as a woman who once owned a watch. A continent standing in for losses larger than itself.”</Text>
          
        </View>
        </ScrollView>


        <TouchableOpacity style={styles.rateUs} onPress={()=>Linking.openURL('https://google.com')} >
            <LinearGradient
              colors={[COLORS.secondary,  "#00A"]}
              style={styles.rateUs}
            >
              <Text style={styles.textRateUs}>Rate US</Text>
            </LinearGradient>
          </TouchableOpacity>

        
      </Animatable.View>
    </View>
    )
}

export default AboutCypher
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  
  sendInner: {
    transform: [{ rotate: "330deg" }],
    marginTop: -3,
    marginLeft: 3,
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 80,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginBottom:20,
    marginHorizontal:10,
    shadowColor:"#000",
    shadowOffset:{
        width:0,
        height:4
    },
    shadowOpacity:0.30,
    shadowRadius:48,

    elevation: 8,
  },
  footHead: {
    marginVertical: 1,
  },
  footHeadText: {
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    
  },
  HeadNameText: {
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    fontSize:22,
  },
  SubHeadNameText: {
    textAlign: "center",
    color: "black",
    fontSize:14,
    marginTop: 6,
    paddingBottom:5,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
  Body: {
    textAlign:'justify',
    color: "black",
    fontSize:12,
    marginTop: 12,
    marginBottom: 42,
    paddingBottom:5,
  
  },
  BodyText: {
    textAlign:'justify',
    color: "black",
    fontSize:14,
    marginTop: 6,
    paddingBottom:5,
    
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 27,
    marginBottom: -20,
  },
  text_footer: {
    marginTop: 8,
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
    paddingLeft: 15,
    color: "#05375a",
    textAlign: "left",
    fontSize: 17,
    fontWeight: "200",
  },
  
  footMethodText: {
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 20,
  },
  method: {
    backgroundColor: "#EAE9F3",
    marginVertical: 5,
    marginHorizontal: 4,
    padding: 12,
    borderRadius: SIZES.radius - 5,
    elevation: 3,
  },
  methodText: {
    color: COLORS.secondary,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "700",
    letterSpacing: 2,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  rateUs: {
    width: "70%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    position: "absolute",
    bottom: 10,
    right: 15,
  },
  textRateUs: {
    color:COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  backIcon: {
    position: "absolute",
    top: 50,
    right: 25,
    backgroundColor: COLORS.white,
    borderRadius: 50,
    height: 50,
    width: 50,
    alignItems: "center",
    shadowColor:"#000",
    shadowOffset:{
        width:0,
        height:4
    },
    shadowOpacity:0.30,
    elevation: 8,
    justifyContent: "center",
  },
});
