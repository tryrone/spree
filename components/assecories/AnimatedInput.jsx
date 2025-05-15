import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const AnimatedInput = ({ placeholder, value, onChangeText, secureTextEntry, rightIcon, editable = true }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const animation = useSharedValue(0);
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  useEffect(() => {
    setShowPlaceholder(value === '');
  }, [value]);

  const focusInput = () => {
    setIsFocused(true);
    animation.value = withTiming(1, { duration: 200 });
  };

  const blurInput = () => {
    if (value === '') {
      setIsFocused(false);
      animation.value = withTiming(0, { duration: 200 });
    }
    setShowPlaceholder(true);
  };

  const placeholderStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      animation.value,
      [0, 1],
      [0, -25],
      Extrapolate.CLAMP
    );

    const scale = interpolate(
      animation.value,
      [0, 1],
      [1, 0.8],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateY }, { scale }],
    };
  });

  return (
    <View style={[styles.container, { width: SCREEN_WIDTH }]}>
      <AnimatedPressable onPress={focusInput} style={StyleSheet.absoluteFill}>
        <Animated.Text style={[styles.placeholder, placeholderStyle, { opacity: showPlaceholder ? 1 : 0 }]}>
          {placeholder}
        </Animated.Text>
      </AnimatedPressable>
      <View style={styles.inputContainer}>
        <AnimatedTextInput
          style={[styles.input, { width: SCREEN_WIDTH - 40 }]}
          value={value}
          onChangeText={onChangeText}
          onFocus={focusInput}
          onBlur={blurInput}
          blurOnSubmit
          secureTextEntry={secureTextEntry}
          editable={editable}
        />
        {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginVertical: 10,
  },
  inputContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
},
input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 4,
    fontSize: 16,
    flex: 1,
    paddingLeft: 20
  },
  placeholder: {
    position: 'absolute',
    left: 20,
    top: 15,
    fontSize: 14,
    color: '#aaa',
    opacity: 0,
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
  },
});

export default AnimatedInput;