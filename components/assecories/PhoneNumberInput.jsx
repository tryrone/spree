import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";

const PhoneNumberInput = ({ setPhone, setCountryCode }) => {
  const [value, setValue] = useState("");
  const phoneInput = useRef(null);
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  return (
    <View style={[styles.container, { width: SCREEN_WIDTH }]}>
      <SafeAreaView style={styles.wrapper}>
        <PhoneInput
          ref={phoneInput}
          defaultValue={value}
          defaultCode="NG"
          containerStyle={styles.inputContainer}
          textContainerStyle={styles.textContainer}
          textInputStyle={styles.inputText}
          layout="first"
          withCountryCode // Ensures country code is displayed in the input
          onChangeCountry={(country) => {
            console.log(country);
            setCountryCode(`+${country.callingCode[0]}`); // Set country code (e.g., +234)
          }}
          onChangeText={(text) => setValue(text)}
          onChangeFormattedText={(text) => setPhone(text)} // Full number with country code
          countryPickerButtonStyle={styles.countryPickerButton} // Optional: Style the country picker
          flagSize={20} // Optional: Adjust flag size
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  wrapper: {
    width: "90%",
    alignItems: "center",
  },
  inputContainer: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    width: "100%",
    justifyContent: "center",
  },
  textContainer: {
    backgroundColor: "transparent",
    paddingVertical: 0,
  },
  inputText: {
    fontSize: 16,
    flex: 1,
  },
  countryPickerButton: {
    borderRightWidth: 1,
    borderColor: "#ccc",
    paddingRight: 10,
  },
});

export default PhoneNumberInput;