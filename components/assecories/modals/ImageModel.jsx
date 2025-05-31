import { Animated, Dimensions, Modal, StyleSheet, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Text from '../TextFont';

const ImageModel = ({ isVisible, imageSource, onClose }) => {
  const scaleValue = useRef(new Animated.Value(0.7)).current; // Start slightly scaled down
  const backgroundOpacity = useRef(new Animated.Value(0)).current; // For background fade

  useEffect(() => {
    if (isVisible) {
      // Opening animation
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1,
          friction: 5, // Smooth, fluid animation
          tension: 60, // Snappy feel
          useNativeDriver: true,
        }),
        Animated.timing(backgroundOpacity, {
          toValue: 1,
          duration: 300, // Smooth fade-in
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Closing animation
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 0.7, // Scale down to initial value
          friction: 5,
          tension: 60,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundOpacity, {
          toValue: 0, // Fade out background
          duration: 200, // Slightly faster fade-out
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Reset values after animation completes
        scaleValue.setValue(0.7);
        backgroundOpacity.setValue(0);
      });
    }
  }, [isVisible]);

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
    //   onRequestClose={onClose}
    >
      <TouchableWithoutFeedback>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              opacity: backgroundOpacity,
            },
          ]}
        >
          <Animated.Image
            source={imageSource}
            style={[
              styles.expandedImage,
              {
                transform: [{ scale: scaleValue }],
              },
            ]}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ImageModel;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandedImage: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').width * 0.8,
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});