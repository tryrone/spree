import { Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState } from 'react';
import Button from '../../../../assecories/Button';
import PhoneNumberInput from '../../../../assecories/PhoneNumberInput';

const ChangePhone = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.loadingContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Text style={styles.titleText}>Verify your number</Text>
              <Text style={styles.descriptionText}>
                Kindly input the phone number you would like to use here
              </Text>
              <View style={{ width: '100%', marginTop: 20 }}>
                <PhoneNumberInput setPhone={setPhone} setCountryCode={setCountryCode} />
              </View>
            </View>
            <View style={{ marginTop: '120%' }}>
              <Button
                title="Get OTP"
                onPress={() => navigation.navigate('emailVerif2')}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChangePhone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: '#667185',
    paddingBottom: 30,
  },
});