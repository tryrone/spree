import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
  } from 'react-native';
  import React, { useRef, useState } from 'react';
  import Ionicons from '@expo/vector-icons/Ionicons';
  import { Dimensions } from 'react-native'; // Added for dynamic width
  
  // Reusable Dialpad Component
  export const Dialpad = ({ onPress }) => {
    const buttons = [
      '1', '2', '3',
      '4', '5', '6',
      '7', '8', '9',
      '', '0', '⌫',
    ];
  
    // Calculate container width dynamically
    const buttonWidth = 80;
    const buttonMargin = 15;
    const buttonsPerRow = 3;
    const containerWidth = buttonsPerRow * (buttonWidth + 2 * buttonMargin);
  
    return (
      <View style={[styles.dialpadContainer, { width: containerWidth }]}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dialpadButton,
              button === '' && styles.dialpadButtonEmpty,
            ]}
            onPress={() => button !== '' && onPress(button)}
            disabled={button === ''}
          >
            <Text style={styles.dialpadButtonText}>
              {button === '⌫' ? <Ionicons name="backspace-outline" size={24} color="#1C202B" /> : button}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    dialpadContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center', // Center buttons horizontally
      alignSelf: 'center', // Center the container in its parent
      marginVertical: 20,
    },
    dialpadButton: {
      width: 80,
      height: 80,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 15,
      borderRadius: 40,
      backgroundColor: '#F5F5F5',
    },
    dialpadButtonEmpty: {
      backgroundColor: 'transparent',
    },
    dialpadButtonText: {
      fontSize: 24,
      color: '#1C202B',
    },
  });