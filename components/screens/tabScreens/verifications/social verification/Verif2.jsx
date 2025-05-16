import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';

export default function SocialLogin() {
    const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.loadingContainer}
        >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Text style={styles.titleText}>Social Log In</Text>
                    <Text style={styles.descriptionText}>
                        You can link your account to either Google, Meta or Apple
                    </Text>
                
                    <TouchableOpacity style={styles.socialButton}
                        onPress={() => navigation.navigate('successPage', {
                            desText: 'Your account has been linked successfully',
                            summary:
                              '',
                          })}
                    >
                        <Text style={styles.buttonText}>Link your Google account</Text>
                        <Image 
                            source={require("../../../../../assets/spree/google.png")}
                            style={styles.googleIcon}
                        />
                    </TouchableOpacity>
                
                    <TouchableOpacity style={styles.socialButton}>
                        <Text style={styles.buttonText}>Link your Apple account</Text>
                        <Fontisto name="apple" size={24} color="black" />
                    </TouchableOpacity>
                
                    <TouchableOpacity style={styles.socialButton}>
                        <Text style={styles.buttonText}>Link your Meta account</Text>
                        <FontAwesome5 name="facebook" size={24} color="#0162F6" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "flex-start",
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
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#98A2B3',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        width: "100%",
        gap: 20
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#19141E'
    },
    googleIcon: {
        width: 24,
        height: 24,
        borderRadius: 12
    },
    appleIcon: {
        width: 24,
        height: 24,
        borderRadius: 12
    },
    metaIcon: {
        width: 24,
        height: 24,
        borderRadius: 12
    }
});