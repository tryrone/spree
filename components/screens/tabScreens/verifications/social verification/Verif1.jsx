import { Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import Button from '../../../../assecories/Button';

const Verif1 = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.loadingContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{display: "flex", flexDirection:"column"}}>
              <Text style={styles.titleText}>Social Log In</Text>
              <Text style={styles.descriptionText}>
              Connect with your favorite social accounts for quick and easy log-in with just a click, no need for passwords.
              </Text>

            <View>
                <Image 
                    style={{
                        marginTop: 10,
                        marginLeft: 50
                    }}
                    source={require('../../../../../assets/spree/social.png')} 
                    width={300.2056884765625}
                    height={338.8876953125}
                    />
            </View>            

          </View>
            <View style={{ marginTop: '40%' }}>
              <Button
                title="Proceed"
                onPress={() => navigation.navigate('socialVerif2')}
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
        color: '#000'
      },
      descriptionText: {
        fontSize: 16,
        textAlign: 'left',
        color: '#667185',
        paddingBottom: 30,
      },
});