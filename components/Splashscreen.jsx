import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated, Dimensions } from 'react-native';
import logo from "../assets/spree/SpreeLogo.png";

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ onAnimationComplete }) => {
  const zoomAnimation = useRef(new Animated.Value(1)).current;
  const slideAnimation = useRef(new Animated.Value(-800)).current; // Start off-screen
  const opacityAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Sequence of animations
    const animationSequence = Animated.sequence([
      // Zoom and spin animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(zoomAnimation, {
            toValue: 1.7,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(zoomAnimation, {
            toValue: 1.3,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(zoomAnimation, {
            toValue: 1.5,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
        {
          iterations: 3, // Loop the animation 3 times
        }
      ),
      
      // Fade out animation
      Animated.timing(opacityAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      })
    ]);

    // Start the animation sequence
    animationSequence.start(() => {
      // Call the onAnimationComplete callback when animations are done
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    });

    // Cleanup function
    return () => {
      animationSequence.stop();
    };
  }, [onAnimationComplete]);

  const zoom = zoomAnimation.interpolate({
    inputRange: [0.8, 1, 1.2],
    outputRange: [0.8, 1, 1.2],
  });

  return (
    <Animated.View 
      style={[
        styles.container, 
        { 
          opacity: opacityAnimation 
        }
      ]}
    >
      <Animated.Image
        source={logo}
        style={[
          styles.image, 
          { 
            transform: [{ scale: zoom }] 
          }
        ]}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#19141E",
    width: width,
    height: height
  },
  image: {
    width: 133,
    height: 60,
    maxWidth: '70%',
    maxHeight: '70%'
  }
});

export default SplashScreen;