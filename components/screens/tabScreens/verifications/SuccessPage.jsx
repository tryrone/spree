import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
  } from 'react-native';
  import React from 'react';
  import Button from '../../../assecories/Button';
  import { useNavigation, useRoute } from '@react-navigation/native';
import Text from '../../../assecories/TextFont';
  
  const SuccessPage = () => {
    const navigation = useNavigation();
    const route = useRoute();
  
    // Extract desText and summary from route params
    const { desText, summary } = route.params || {};
  
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.loadingContainer}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}>
                <Image
                  style={{
                    marginTop: 30,
                    width: 250,
                    height: 250,
                  }}
                  source={require('../../../../assets/spree/success.gif')}
                />
                <Text style={styles.titleText}>Successful!</Text>
                <Text style={styles.descriptionText}>
                  {desText}
                </Text>
                <Text
                  style={{
                    fontWeight: '400',
                    fontSize: 18, 
                    color: 'black',
                    textAlign: "center",
                    paddingVertical: 30,
                    lineHeight: 27
                  }}
                >
                  {summary}
                </Text>
              </View>
              <Button
                title="Back to dashboard"
                onPress={() => navigation.navigate('Homepage')}
              />
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  export default SuccessPage;
  
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
      color: '#A299A7'
    },
  });