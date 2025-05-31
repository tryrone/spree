import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useRef, useState } from 'react'
import AnimatedInput from '../../../../assecories/AnimatedInput'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Dialpad } from '../../../../assecories/Dailpad';
import Button from '../../../../assecories/Button';
import { useNavigation } from '@react-navigation/native';
import Text from '../../../../assecories/TextFont'

const Reset2 = () => {
    const navigation = useNavigation();
    const [code, setCode] = useState(['', '', '', '']);
    const [error, setError] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const inputRefs = useRef(code.map(() => React.createRef()));
  
    const verifyOtp = (otp) => {
      // Replace with actual OTP verification logic
      console.log('Verifying OTP:', otp);
      if (otp !== '1234') { // Example: Mock verification
        setError(true);
      } else {
        setError(false);
        navigation.navigate('reset3')
      }
    };
  
    const handleInputChange = (index, value) => {
      if (!/^[0-9]*$/.test(value) && value !== '') return; // Allow only numbers
  
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
  
      // Move focus to next input
      if (value && index < code.length - 1) {
        inputRefs.current[index + 1].current.focus();
      }
  
      // Check if all code inputs are filled
      if (newCode.every((digit) => digit !== '')) {
        verifyOtp(newCode.join(''));
      } else {
        setError(false);
      }
    };
  
    const handleDialpadPress = (value) => {
      if (value === '⌫') {
        // Find the last filled input or the last input
        for (let i = code.length - 1; i >= 0; i--) {
          if (code[i] !== '' || i === 0) {
            handleInputChange(i, '');
            inputRefs.current[i].current.focus();
            break;
          }
        }
      } else {
        // Find the first empty input
        const emptyIndex = code.findIndex((digit) => digit === '');
        if (emptyIndex !== -1) {
          handleInputChange(emptyIndex, value);
        }
      }
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.loadingContainer}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.titleText}>Email verification</Text>
              <Text style={styles.descriptionText}>
                Kindly enter the 4 digit code (OTP) sent to your e-mail to continue
              </Text>
  
              <View style={styles.inputCodeContainer}>
                {code.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={inputRefs.current[index]}
                    style={[styles.inputCode, error && styles.inputCodeError]}
                    value={digit}
                    onChangeText={(value) => handleInputChange(index, value)}
                    keyboardType="numeric"
                    maxLength={1}
                    editable={false}
                    textAlign="center"
                  />
                ))}
              </View>
              {error && <Text style={styles.errorMessage}>Invalid OTP, Please Retry</Text>}
  
              <TouchableOpacity style={styles.resendContainer}>
                {refreshing ? (
                  <ActivityIndicator size="small" color="green" />
                ) : (
                  <>
                    <Text style={{fontWeight: "300", fontSize: 15}}>Didn't get it?</Text>
                    <Ionicons name="arrow-forward" size={16} color="#1C202B" />
                    <Text style={styles.resendText}>Resend Code</Text>
                  </>
                )}
              </TouchableOpacity>
  
              <Dialpad onPress={handleDialpadPress} />
              
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  export default Reset2;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    loadingContainer: {
      flex: 1,
      paddingTop: '10%',
      paddingHorizontal: 20,
    },
    titleText: {
      fontSize: 24,
      fontWeight: '600',
      marginBottom: 8,
      textAlign: 'left',
      color: '#000',
    },
    descriptionText: {
      fontSize: 16,
      textAlign: 'left',
      color: '#212529',
      paddingBottom: 30,
    },
    inputCodeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 25,
      marginHorizontal: 40
    },
    inputCode: {
      width: 54,
      height: 54,
      borderWidth: 1,
      borderColor: '#CCCCCC',
      borderRadius: 8,
      textAlign: 'center',
      fontSize: 18,
    },
    inputCodeError: {
      borderColor: '#F37A74',
    },
    errorMessage: {
      color: '#EE4139',
      marginBottom: 20,
    },
    resendContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: "flex-start",
      marginBottom: '10%',
    },
    resendText: {
      fontSize: 14,
      color: '#1C202B',
      marginRight: 5,
      fontWeight: 'bold',
    }
  });