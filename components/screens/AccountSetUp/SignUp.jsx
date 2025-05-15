import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import SocialsOnboarding from '../../assecories/SocialsOnboarding'
import AnimatedInput from '../../assecories/AnimatedInput'
import PhoneNumberInput from '../../assecories/PhoneNumberInput'
import Button from '../../assecories/Button'
import { useNavigation } from '@react-navigation/native'

const SignUp = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  // Input validation functions
  const validatePassword = (password) => {
    // Password must contain at least 8 characters, including uppercase, lowercase, number, and special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const sanitizeInput = (text, type) => {
    switch (type) {
      case 'email':
        // Remove spaces and control characters from email
        return text.replace(/\s+/g, '');
      case 'password':
        // Allow valid password characters
        return text;
      default:
        return text;
    }
  };

  const renderInput = (
    placeholder,
    value,
    onChangeText
  ) => (
    <View style={styles.inputContainer}>
      <View
        style={[
          placeholder === "Password" && !isPasswordValid
            ? styles.invalidInput
            : {},
        ]}
      >
        {placeholder === "Phone" ? (
          <View>
            <PhoneNumberInput setPhone={setPhone} setCountryCode={setCountryCode}/>
          </View>
        ) : (
          <AnimatedInput
            placeholder={placeholder}
            value={value}
            onChangeText={(text) => {
              // Apply sanitization for email and password fields
              if (placeholder === "Email Address") {
                const sanitized = sanitizeInput(text, 'email');
                onChangeText(sanitized);
              } else if (placeholder === "Password") {
                const sanitized = sanitizeInput(text, 'password');
                onChangeText(sanitized);
                const isValid = validatePassword(sanitized);
                setIsPasswordValid(isValid);
              } else {
                onChangeText(text);
              }
            }}
          />
        )}
      </View>
      {placeholder === "Password" && !isPasswordValid && (
        <Text style={styles.errorText}>
          Password must contain at least 8 characters, including uppercase,
          lowercase, number, and special character.
        </Text>
      )}
    </View>
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.loadingContainer}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Socials link Onboarding  */}                
                <SocialsOnboarding/>

                {/* or lines */}
                <View style={styles.lines}>
                  <View style={styles.line}/>
                    <Text style={{color: "#667085", paddingHorizontal: 10}}>Or</Text>
                  <View style={styles.line}/>
                </View>

                {/* Sign Up forms */}
                {renderInput("First Name", firstName.trim(), setFirstName)}
                {renderInput("Last Name", lastName.trim(), setLastName)}
                {renderInput("Email Address", email.trim(), setEmail)}
                {renderInput("Phone", phone.trim(), setPhone)}

                {/* create account button */}
                <View style={{marginTop: "20%"}}>
                  <Button
                    title="Create Account"
                    onPress={() => navigation.navigate('createPassword')}
                  />
                </View>

                {/* LogIn account navigation */}
                <View style={{
                  display: "flex", 
                  flexDirection: "row", 
                  alignItems: "center",
                  marginVertical: 20,
                  justifyContent: "center"
                }}>
                  <Text>Already have an account? </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('signIn')}
                  >
                    <Text style={{
                      color: "#BC1B06",
                      fontSize: 14,
                      paddingVertical: 10
                    }}>
                      Log In
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

export default SignUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    paddingTop: '10%',
    paddingHorizontal: 20
  },
  lines: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "10%"
  },
  line: {
    borderWidth: 1,
    borderColor: "#D0D5DD",
    width: 164
  },
  inputContainer: {
    marginBottom: 16
  },
  invalidInput: {
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 8
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4
  }
})