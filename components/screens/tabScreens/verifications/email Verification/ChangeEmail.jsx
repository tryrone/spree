import { Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState } from 'react';
import Button from '../../../../assecories/Button';
import AnimatedInput from '../../../../assecories/AnimatedInput';
import { useNavigation } from '@react-navigation/native';

const ChangeEmail = ({ navigation }) => {
    const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.loadingContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{display: "flex", flexDirection:"column", alignItems: "flex-start"}}>
              <Text style={styles.titleText}>Verify your e-mail</Text>
              <Text style={styles.descriptionText}>
                Kindly input the e-mail you would like to use here
              </Text>         
            <AnimatedInput
              placeholder="favour@gmail.com"
              value={email}
              onChangeText={setEmail}
            />
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

export default ChangeEmail;

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
    color: '#000'
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'left',
    color: '#667185',
    paddingBottom: 30,
  },
});