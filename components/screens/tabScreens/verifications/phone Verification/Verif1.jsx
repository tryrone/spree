import { Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
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
          <View style={{display: "flex", flexDirection:"column", alignItems: "flex-start"}}>
              <Text style={styles.titleText}>Verify your number</Text>
              <Text style={styles.descriptionText}>
                We have <Text style={{fontWeight: "500", color: "black"}}>+234-9068899673</Text>  as your registered phone number.
              </Text>

            <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <Text style={{ fontSize: 16, }}>Not you? </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('phoneChange')}
                    >
                        <Text style={{color: "#5B19E5", fontSize: 16, }}>Change number</Text>
                    </TouchableOpacity>
            </View>            

          </View>
            <View style={{ marginTop: '120%' }}>
              <Button
                title="Get OTP"
                onPress={() => navigation.navigate('phoneVerif2')}
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