import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Transactions = () => {
  return (
    <View style={styles.container}>
      <Text>Transactions</Text>
    </View>
  )
}

export default Transactions

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30
    }
})