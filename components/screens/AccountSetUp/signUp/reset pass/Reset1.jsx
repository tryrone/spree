import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import Button from '../../../../assecories/Button'
import AnimatedInput from '../../../../assecories/AnimatedInput'
import { useNavigation } from '@react-navigation/native'

const Reset1 = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');

  return (
    <>
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.loadingContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.titleText}>Reset password</Text>
                <Text style={styles.descriptionText}>Let's get your account back. Ensure you have access to this phone number or email.</Text>

                <AnimatedInput
                    placeholder="Enter your Email or Phone number"
                    value={email}
                    onChangeText={setEmail}
                />

                <View style={{marginTop: "130%"}}>
                    <Button
                        title="Reset password"
                        onPress={() => navigation.navigate('reset2')}
                    />
                </View>

            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  )
}

export default Reset1

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
    titleText: {
      fontSize: 24,
      fontWeight: '600',
      marginBottom: 8,
      textAlign: "left",
      color: '#000'
    },
    descriptionText: {
      fontSize: 16,
      textAlign: "left",
      color: '#212529',
      paddingBottom: 30
    },
})