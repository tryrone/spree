import { Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Text from '../../assecories/TextFont';
import AnimatedInput from '../../assecories/AnimatedInput';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import { Ionicons } from '@expo/vector-icons'; 
import Button from '../../assecories/Button';
import SocialsOnboarding from '../../assecories/SocialsOnboarding';

const SignIn = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to manage password visibility

  return (
    <>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.loadingContainer}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.titleText}>Welcome back</Text>
            <Text style={styles.descriptionText}>You can use your email or Phone number, or continue with your social accounts.</Text>

            {/* Socials link Onboarding  */}
            <SocialsOnboarding/>

            {/* or lines */}
            <View style={styles.lines}>
              <View style={styles.line}/>
                <Text style={{color: "#667085", paddingHorizontal: 10}}>Or</Text>
              <View style={styles.line}/>
            </View>

          {/* Sign in input fields */}
            <AnimatedInput
              placeholder="Enter your Email or Phone number"
              value={email}
              onChangeText={setEmail}
            />

            <AnimatedInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible} // Toggle visibility here
              />
              <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {
                  isPasswordVisible ?
                  <Text style={{color: "#44115C", fontWeight: "500"}}>hide</Text> : 
                  <Text style={{color: "#44115C", fontWeight: "500"}}>show</Text>
                }
              </TouchableOpacity>

            {/* forgot password navigation */}
              <TouchableOpacity
                onPress={() => navigation.navigate('reset1')}
              >
                <Text style={{
                  color: "#5925DC",
                  fontSize: 14,
                  paddingVertical: 10
                }}>
                  Forgot password?
                </Text>
              </TouchableOpacity>

              {/* Sign In button */}
              <View style={{marginTop: "45%"}}>
                <Button
                  title="Log In"
                  onPress={() => navigation.navigate('Homepage')}
                />
              </View>

            {/* create account navigation */}
            <View style={{
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center",
              marginVertical: 40
            }}>
              <Text>Don't have an account? </Text>
              <TouchableOpacity 
                onPress={() => navigation.navigate('signUp')}
              >
                <Text style={{
                  color: "#5925DC",
                  fontSize: 14,
                  paddingVertical: 10
                }}>
                  Create an account 
                </Text>
              </TouchableOpacity>
            </View>

            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  )
}

export default SignIn

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
    },
    loadingContainer: {
      flex: 1,
      paddingTop: '15%',
      paddingHorizontal: 20
    },
    titleText: {
      fontSize: 24,
      fontWeight: '600',
      marginBottom: 8,
      textAlign: 'center',
      color: '#000'
    },
    descriptionText: {
      fontSize: 16,
      textAlign: 'center',
      color: '#212529'
    },
    lines: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "5%"
    },
    line: {
      borderWidth: 1,
      borderColor: "#D0D5DD",
      width: 164
    },
    toggleButton: {
      position: 'absolute',
      right: 10,
      top: '41.5%',
      paddingRight: 10,
    },
})