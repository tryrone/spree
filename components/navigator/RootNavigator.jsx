import React, { useEffect,useState } from 'react';
import { Platform, LogBox, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Store from '../screens/tabScreens/Store';
import Transactions from '../screens/tabScreens/Transactions';
import Messages from '../screens/tabScreens/Messages';
import Home from '../screens/tabScreens/Home';

// icons
// home icon
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// tab icons 
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Onboarding from '../screens/Onboarding';
import SignIn from '../screens/AccountSetUp/SignIn';
import SignUp from '../screens/AccountSetUp/SignUp';
import { LinearGradient } from 'expo-linear-gradient';
import CreatePassword from '../screens/AccountSetUp/signUp/CreatePassword';
import Reset1 from '../screens/AccountSetUp/signUp/reset pass/Reset1';
import Reset2 from '../screens/AccountSetUp/signUp/reset pass/Reset2';
import Reset3 from '../screens/AccountSetUp/signUp/reset pass/Reset3';
import Profile from '../screens/tabScreens/Profile';
import KycVerif1 from '../screens/tabScreens/verifications/kyc Verification/Verif1';
import KycVerif2 from '../screens/tabScreens/verifications/kyc Verification/Verif2';
import SuccessPage from '../screens/tabScreens/verifications/SuccessPage';
import EmailVerif1 from '../screens/tabScreens/verifications/email Verification/Verif1';
import ChangeEmail from '../screens/tabScreens/verifications/email Verification/ChangeEmail';
import EmailVerif2 from '../screens/tabScreens/verifications/email Verification/Verif2';
import ChangePhone from '../screens/tabScreens/verifications/phone Verification/ChangePhone';
import PhoneVerif1 from '../screens/tabScreens/verifications/phone Verification/Verif1';
import PhoneVerif2 from '../screens/tabScreens/verifications/phone Verification/Verif2';
import SocialVerif1 from '../screens/tabScreens/verifications/social verification/Verif1';
import SocialVerif2 from '../screens/tabScreens/verifications/social verification/Verif2';
import Text from '../assecories/TextFont';
import TransactionDetails from '../screens/tabScreens/transaction extentions/TransactionDetails';
import MessageDetails from '../screens/tabScreens/message extension/MessageDetails';
import { messageData } from '../Dummy Data/data';



const ios = Platform.OS === 'ios';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get('window');


const menuIcons = (route, focused) => {
    // console.log(`Width: ${width}, Height: ${height}`);
    let icon;
  
    if (route.name === 'home') {
      icon = focused ? <Entypo name="home" size={32} color="#263238" /> : <Feather name="home" size={32} color="#263238" />;
    } else if (route.name === 'messages') {
      icon = focused ? <MaterialCommunityIcons name="message-text" size={32} color="#263238" /> : <MaterialCommunityIcons name="message-text-outline" size={32} color="#263238" />;
    } else if (route.name === 'store') {
      icon = focused ? <Ionicons name="storefront" size={32} color="#263238" />  : <Ionicons name="storefront-outline" size={32} color="#263238" />;
    } else if (route.name === 'transactions') {
      icon = focused ? <MaterialCommunityIcons name="ticket-confirmation" size={32} color="#263238" />  : <MaterialCommunityIcons name="ticket-confirmation-outline" size={32} color="#263238" />;
    }else if (route.name === 'profile') {
      icon = focused ? <Ionicons name="person-sharp" size={32} color="#263238" />  : <Ionicons name="person-outline" size={32} color="#263238" />;
    }
  
    return (
      <View style={{ display: "flex", justifyContent: 'center', alignItems: 'center' , flexDirection: "column"}}>
        {
          route.name === 'messages'
          ? <Text style={styles.messageBage}>
              {messageData.filter(msg => msg.status === 'unread').length}
            </Text> : 
          <Text></Text>
        }
        {icon}
        <Text style={{ color: focused ? '#263238' : '#8e8e8e', fontSize: 12, marginTop: 2, width:"100%", height:"100%" }}>
          {route.name.charAt(0).toUpperCase() + route.name.slice(1)}
        </Text>
      </View>
    );
  };
  
  const tabScreenOptions = {
    headerShown: true,
    headerTintColor: '#000',

    headerTitleStyle: {
      fontWeight: 'medium',
      fontSize: 18,
      paddingBottom: 15
    }
  };
  
  function HomeTabs() {
    return (
      <View style={styles.container}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => menuIcons(route, focused),
            tabBarStyle: {
              alignItems: 'center',
              backgroundColor: 'white',
              borderTopWidth: 0,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              elevation: 3,
              shadowColor: "#0000001A",
              shadowOffset: {
                width: 0,
                height: -4,
              },
              shadowOpacity: 0.9,
              shadowRadius: 3,
              height: 83,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            },
            tabBarItemStyle: {
              marginTop: 20,
            },
          })}
        >
          <Tab.Screen name="home" component={HomeStackScreen} />
          <Tab.Screen name="messages" component={Messages} options={{ ...tabScreenOptions, headerTitle: "Messages" }} />
          <Tab.Screen name="store" component={Store} options={{ ...tabScreenOptions, headerTitle: "Store" }} />
          <Tab.Screen name="transactions" component={Transactions} options={{ ...tabScreenOptions, headerTitle: "" }} />
          <Tab.Screen name="profile"  options={{ ...tabScreenOptions, headerTitle: "Profile" }} >
          {()=><Profile />}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
    );
  }
  
  const HomeStack = createStackNavigator();
  
  function HomeStackScreen() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        {/* <HomeStack.Screen name="Notification" component={Notification} options={{ headerShown: false }} /> */}
      </HomeStack.Navigator>
    );
  }


  export default function RootNavigator() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>            
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Onboarding"
                    screenOptions={{
                    contentStyle: { backgroundColor: 'white', paddingBottom: 30 },
                    headerBackTitleVisible: false,
                    headerLeft: (props) => (
                        <TouchableOpacity style={{ marginLeft: 20, marginBottom: 20 }} onPress={props.onPress}>
                            <Ionicons name="chevron-back" size={24} color="black" />
                        </TouchableOpacity>
                    ),
                    headerTitleAlign: 'center',
                    }}
                >
                    <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }}  />
                    <Stack.Screen name="signIn" component={SignIn} options={{ ...tabScreenOptions, headerTitle: "Log In" }}  />
                    <Stack.Screen name="signUp" component={SignUp} options={{ ...tabScreenOptions, headerTitle: "Create account" }}  />
                    <Stack.Screen name="Homepage"  options={{ headerShown: false }}  >
                        {() => <HomeTabs/>}
                    </Stack.Screen>

                    {/* create password */}
                    <Stack.Screen name="createPassword" component={CreatePassword} options={{ ...tabScreenOptions, headerTitle: "Create account" }}  />
                    <Stack.Screen name="reset1" component={Reset1} options={{ ...tabScreenOptions, headerTitle: "" }}  />
                    <Stack.Screen name="reset2" component={Reset2} options={{ ...tabScreenOptions, headerTitle: "" }}  />
                    <Stack.Screen name="reset3" component={Reset3} options={{ ...tabScreenOptions, headerTitle: "" }}  />

                    {/* Kyc Verification */}
                    <Stack.Screen name="kycVerif1" component={KycVerif1} options={{ ...tabScreenOptions, headerTitle: "" }}  />
                    <Stack.Screen name="kycVerif2" component={KycVerif2} options={{ ...tabScreenOptions, headerTitle: "" }}  />
                    {/* Email Verification */}
                    <Stack.Screen name="emailVerif1" component={EmailVerif1} options={{ ...tabScreenOptions, headerTitle: "" }}  />
                    <Stack.Screen name="emailVerif2" component={EmailVerif2} options={{ ...tabScreenOptions, headerTitle: "" }}  />
                    <Stack.Screen name="emailChange" component={ChangeEmail} options={{ ...tabScreenOptions, headerTitle: "" }}  />
                    {/* Phone Verification */}
                    <Stack.Screen name="phoneVerif1" component={PhoneVerif1} options={{ ...tabScreenOptions, headerTitle: "" }}  />
                    <Stack.Screen name="phoneVerif2" component={PhoneVerif2} options={{ ...tabScreenOptions, headerTitle: "" }}  />
                    <Stack.Screen name="phoneChange" component={ChangePhone} options={{ ...tabScreenOptions, headerTitle: "" }}  />
                    {/* Socials Verification */}
                    <Stack.Screen name="socialVerif1" component={SocialVerif1} options={{ ...tabScreenOptions, headerTitle: "" }}  />
                    <Stack.Screen name="socialVerif2" component={SocialVerif2} options={{ ...tabScreenOptions, headerTitle: "" }}  />

                    {/* Transaction Details */} 
                    <Stack.Screen name="transactionDets" component={TransactionDetails} options={{ ...tabScreenOptions, headerTitle: "" }}  />       

                    {/* Message Details */} 
                    <Stack.Screen name="messageDets" component={MessageDetails} options={{ ...tabScreenOptions, headerTitle: "Raised dispute" }}  />                 

                    {/* Success Page */}
                    <Stack.Screen name="successPage" component={SuccessPage} options={{ ...tabScreenOptions, headerTitle: "Success" }}  />
                </Stack.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // marginVertical: 20, 
      zIndex: 1,
    },
    messageBage: {
      position: "absolute",
      top: -27,
      right: 4,
      backgroundColor: "#E7503C",
      color: "white",
      padding: 2.5,
      paddingLeft: 5,
      paddingBottom: 18,
      fontSize: 11,
      borderRadius: 999,
      width: 18,
      height: 18
    }
  });
  