import { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  Animated, 
  Easing,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AnimatedInput from '../../../../assecories/AnimatedInput';
import Button from '../../../../assecories/Button';
import PolicyModal from '../../../../assecories/PolicyModal';
import Text from '../../../../assecories/TextFont'

// Custom CheckIcon component that doesn't require external dependencies
const CheckIcon = ({ color }) => (
  <View style={{ width: 14, height: 14 }}>
    <View style={{
      position: 'absolute',
      left: 0,
      width: 3,
      height: 7,
      backgroundColor: color,
      borderRadius: 1,
      top: 4,
      transform: [{ rotate: '45deg' }]
    }} />
    <View style={{
      position: 'absolute',
      right: 2,
      width: 3,
      height: 10,
      backgroundColor: color,
      borderRadius: 1,
      top: 1,
      transform: [{ rotate: '-45deg' }]
    }} />
  </View>
);

const PasswordStrengthChecker = ({ password }) => {
  // Animation values for each criteria
  const circle1Anim = useState(new Animated.Value(0))[0];
  const circle2Anim = useState(new Animated.Value(0))[0];
  const circle3Anim = useState(new Animated.Value(0))[0];
  
  const check1Anim = useState(new Animated.Value(0))[0];
  const check2Anim = useState(new Animated.Value(0))[0];
  const check3Anim = useState(new Animated.Value(0))[0];

  // Check password criteria
  const hasMinLength = password.length >= 8;
  const hasMixedCase = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const hasSpecialChar = /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);

  // Animate when criteria changes
  useEffect(() => {
    // Animate min length criteria
    Animated.parallel([
      Animated.timing(circle1Anim, {
        toValue: hasMinLength ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(check1Anim, {
        toValue: hasMinLength ? 1 : 0,
        duration: 300,
        delay: hasMinLength ? 150 : 0,
        useNativeDriver: false,
        easing: Easing.elastic(1)
      })
    ]).start();

    // Animate mixed case criteria
    Animated.parallel([
      Animated.timing(circle2Anim, {
        toValue: hasMixedCase ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(check2Anim, {
        toValue: hasMixedCase ? 1 : 0,
        duration: 300,
        delay: hasMixedCase ? 150 : 0,
        useNativeDriver: false,
        easing: Easing.elastic(1)
      })
    ]).start();

    // Animate special character criteria
    Animated.parallel([
      Animated.timing(circle3Anim, {
        toValue: hasSpecialChar ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(check3Anim, {
        toValue: hasSpecialChar ? 1 : 0,
        duration: 300,
        delay: hasSpecialChar ? 150 : 0,
        useNativeDriver: false,
        easing: Easing.elastic(1)
      })
    ]).start();
  }, [hasMinLength, hasMixedCase, hasSpecialChar]);

  const circle1BackgroundColor = circle1Anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E4E7EC', '#5E37CE']
  });

  const circle2BackgroundColor = circle2Anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E4E7EC', '#5E37CE']
  });

  const circle3BackgroundColor = circle3Anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E4E7EC', '#5E37CE']
  });

  const text1Color = circle1Anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#667085', '#344054']
  });

  const text2Color = circle2Anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#667085', '#344054']
  });

  const text3Color = circle3Anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#667085', '#344054']
  });

  return (
    <View style={styles.validationContainer}>
      {/* Password requirement 1 */}
      <View style={styles.validationItem}>
        <Animated.View style={[
          styles.circle,
          { backgroundColor: circle1BackgroundColor }
        ]}>
          <Animated.View style={{ opacity: check1Anim, transform: [{ scale: check1Anim }] }}>
            <CheckIcon color="white" />
          </Animated.View>
        </Animated.View>
        <Animated.Text style={[styles.validationText, { color: text1Color }]}>
          Must be at least 8 characters
        </Animated.Text>
      </View>

      {/* Password requirement 2 */}
      <View style={styles.validationItem}>
        <Animated.View style={[
          styles.circle,
          { backgroundColor: circle2BackgroundColor }
        ]}>
          <Animated.View style={{ opacity: check2Anim, transform: [{ scale: check2Anim }] }}>
            <CheckIcon color="white" />
          </Animated.View>
        </Animated.View>
        <Animated.Text style={[styles.validationText, { color: text2Color }]}>
          Must include upper and lowercase letters
        </Animated.Text>
      </View>

      {/* Password requirement 3 */}
      <View style={styles.validationItem}>
        <Animated.View style={[
          styles.circle,
          { backgroundColor: circle3BackgroundColor }
        ]}>
          <Animated.View style={{ opacity: check3Anim, transform: [{ scale: check3Anim }] }}>
            <CheckIcon color="white" />
          </Animated.View>
        </Animated.View>
        <Animated.Text style={[styles.validationText, { color: text3Color }]}>
          Must include number or special character
        </Animated.Text>
      </View>
    </View>
  );
};

const Reset3 = () => {
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.loadingContainer}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.titleText}>Create strong Password</Text>
              
              {/* Create pass input */}
              <Text style={{ color: "#344054" }}>Create Password</Text>
              <View>
                <AnimatedInput
                  placeholder=""
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity
                  style={styles.toggleButton}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <Text style={{ color: "#44115C", fontWeight: "500" }}>
                    {isPasswordVisible ? "hide" : "show"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Confirm password input */}
              <Text style={{ color: "#344054", marginTop: 20 }}>Confirm Password</Text>
              <View>
                <AnimatedInput
                  placeholder=""
                  value={confirmPass}
                  onChangeText={setConfirmPass}
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity
                  style={styles.toggleButtons}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <Text style={{ color: "#44115C", fontWeight: "500" }}>
                    {isPasswordVisible ? "hide" : "show"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Password strength checker */}
              <PasswordStrengthChecker password={password} />

              {/* Sign In button */}
              <View style={{marginTop: "85%"}}>
                <Button
                  title="Reset Password"
                  onPress={() => navigation.navigate('Homepage')}
                />
              </View>

            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    paddingTop: '5%',
    paddingHorizontal: 20
  },
  titleText: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 8,
    textAlign: 'center',
    color: '#000',
    marginBottom: 30
  },
  toggleButton: {
    position: 'absolute',
    right: 10,
    top: '40%',
    paddingRight: 10,
  },
  toggleButtons: {
    position: 'absolute',
    right: 10,
    top: '40%',
    paddingRight: 10,
  },
  // Validation styles
  validationContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  validationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  validationText: {
    fontSize: 14,
  },
    // Terms and privacy styles
    termsContainer: {
      marginBottom: 20,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
    },
    termsLinksContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
    },
    termsText: {
      color: '#344054',
      fontSize: 14,
      lineHeight: 20,
    },
    termsLink: {
      color: '#5E37CE',
      textDecorationLine: 'underline',
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '500',
    },
});

export default Reset3;