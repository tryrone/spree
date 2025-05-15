import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';

const SocialsOnboarding = () => {
  return (
    <View style={styles.socials}>
        <TouchableOpacity style={styles.socialsLink}>
            <Image
                source={require('../../assets/spree/google.png')}
                style={{width:24, height:24}}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialsLink}>
            <Fontisto name="apple" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialsLink}>
            <FontAwesome5 name="facebook" size={24} color="#0162F6" />
        </TouchableOpacity>
    </View>
  )
}

export default SocialsOnboarding

const styles = StyleSheet.create({
    socials: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "7%",
        marginVertical: '7%'
      },
      socialsLink: {
        backgroundColor: "#F1F1F1",
        width: 52,
        height: 52,
        borderRadius: 32,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
      },
})