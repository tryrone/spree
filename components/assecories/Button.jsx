import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

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
        fontWeight: 500,
        color: "#ffffff",
        textAlign: "center"
    }
})