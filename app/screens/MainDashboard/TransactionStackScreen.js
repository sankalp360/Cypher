import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import FromBankScreen from "./TransactionScreens/FromBankScreen";
import SendMoneyScreen from "./TransactionScreens/SendMoneyScreen";
import ReceiveMoneyScreen from "./TransactionScreens/ReceiveMoneyScreen";

const TransactionStack = createStackNavigator();

const TransactionStackScreen = ({ navigation, BaseURL, senderId }) => {
  // useEffect(() => {
  //   navigation.setOptions({ tabBarVisible: false });
  // }, []);
  return (
    <TransactionStack.Navigator headerMode="none">
      <TransactionStack.Screen name="FromBank">
        {(props) => <FromBankScreen {...props} base={BaseURL} id={senderId} />}
      </TransactionStack.Screen>
      <TransactionStack.Screen name="SendMoney">
        {(props) => <SendMoneyScreen {...props} base={BaseURL} id={senderId} />}
      </TransactionStack.Screen>
      <TransactionStack.Screen name="ReceiveMoney">
        {(props) => <ReceiveMoneyScreen {...props} id={senderId} />}
      </TransactionStack.Screen>
    </TransactionStack.Navigator>
  );
};

export default TransactionStackScreen;

