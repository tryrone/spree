import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Text from './TextFont'

const Button = ({title, onPress}) => {
  return (
    <TouchableOpacity 
        style={styles.body}
        onPress={onPress}
    >
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    body: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: "#19141E",
        borderRadius: 8,
        width: "100%"
    },
    text: {
        fontSize: 16,
        fontWeight: 400,
        color: "#ffffff",
        textAlign: "center"
    }
})