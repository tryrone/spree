import React, { useEffect, useRef } from 'react';
import {
  Animated,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import Text from '../../../assecories/TextFont';

const AnimatedCategoryItem = ({ item, index, onPress, style }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Stagger the animation based on index for a cascading effect
    const delay = index * 150; // 150ms delay between each item

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index]);

  const handlePress = () => {
    // Add a subtle press animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Call the original onPress function
    if (onPress) {
      onPress();
    }
  };

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: fadeAnim,
          transform: [
            { translateY: slideAnim },
            { scale: scaleAnim },
          ],
        },
      ]}
    >
      <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
        <View style={animatedStyles.imageContainer}>
          <Image source={item.image} style={animatedStyles.categoryImg} />
          <View style={animatedStyles.overlay} />
          <Text style={animatedStyles.categoryText}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const animatedStyles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
  },
  categoryImg: {
    width: '100%',
    height: 103.80000305175781,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0000005b',
    borderRadius: 8,
  },
  categoryText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    position: 'absolute',
    alignSelf: 'center',
    bottom: 10,
    zIndex: 1,
  },
});

export default AnimatedCategoryItem;