import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import Text from './TextFont';

const MessageTab = ({ selectedTab = 'Inbox', onTabChange = () => {} }) => {
  const [isToggled, setIsToggled] = useState(selectedTab === 'Dispute');
  const [containerWidth, setContainerWidth] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (containerWidth > 0) {
      Animated.parallel([
        Animated.spring(translateX, {
          toValue: isToggled ? containerWidth / 2 - 8 : 0, // Adjust translateX for -8 offset on Dispute
          speed: 12,
          bounciness: 8,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: isToggled ? 0.5 : 1,
          duration: 200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isToggled, containerWidth]);

  const toggleButton = useCallback(() => {
    const newTab = isToggled ? 'Inbox' : 'Dispute';
    setIsToggled(!isToggled);
    onTabChange(newTab);

    // Scale animation on tap
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
  }, [isToggled, onTabChange, scaleAnim]);

  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  const buttonWidth = containerWidth / 2;

  return (
    <View style={styles.sliderContainer} onLayout={onLayout}>
      <TouchableOpacity
        style={styles.sliderBackground}
        activeOpacity={0.8}
        onPress={toggleButton}
      >
        <Animated.View
          style={[
            styles.sideContainer,
            isToggled ? styles.offContainer : styles.onContainer,
            { opacity: fadeAnim },
          ]}
        >
          <Text style={styles.sideText}>
            {isToggled ? 'Inbox' : 'Dispute'}
          </Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.sideContainer,
            isToggled ? styles.onContainer : styles.offContainer,
            { opacity: isToggled ? 1 : 0.5 },
          ]}
        >
          <Text style={styles.sideText}>
            {isToggled ? 'Inbox' : 'Dispute'}
          </Text>
        </Animated.View>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.sliderButton,
          {
            width: buttonWidth,
            transform: [{ translateX }, { scale: scaleAnim }],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={toggleButton}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>
            {isToggled ? 'Dispute' : 'Inbox'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    height: 46,
    backgroundColor: '#EBE9FE',
    borderRadius: 99,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    width: '70%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  sliderBackground: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    backgroundColor: '#EBE9FE',
    borderRadius: 99,
  },
  sideContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  onContainer: {
    opacity: 0.5,
  },
  offContainer: {
    opacity: 1,
  },
  sliderButton: {
    position: 'absolute',
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: '#27252B',
    fontWeight: '300',
    fontSize: 14,
  },
  sideText: {
    color: '#1A1A1A',
    fontWeight: '500',
    fontSize: 14,
  },
});

export default MessageTab;