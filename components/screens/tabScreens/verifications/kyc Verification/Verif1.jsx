import { Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import Button from '../../../../assecories/Button';
import Text from '../../../../assecories/TextFont';

const Verif1 = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.loadingContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
              <Text style={styles.titleText}>KYC Verification</Text>
              <Text style={styles.descriptionText}>
                Please verify your identity by providing your BVN and account number.
              </Text>

            <View>
                <Image 
                    style={{
                        marginTop: 80
                    }}
                    source={require('../../../../../assets/spree/scan.gif')} 
                    width={250}
                    height={250}
                    />
            </View>            

          </View>
            <View style={{ marginTop: '60%' }}>
              <Button
                title="Proceed"
                onPress={() => navigation.navigate('kycVerif2')}
                />
            </View>
                </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Verif1;

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
    marginLeft: "-47%"
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'left',
    color: '#667185',
    paddingBottom: 30,
  },
});