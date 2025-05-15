import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Store = () => {
  return (
    <View style={styles.container}>
      <Text>Store</Text>
    </View>
  )
}

export default Store

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30
    }
})