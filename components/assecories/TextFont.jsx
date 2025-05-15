import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import { globalStyles } from './Globalstyle';


const Text = ({ 
  children, 
  style, 
  variant = 'default', 
  ...rest 
}) => {
  const variantStyles = {
    default: {},
    bold: { fontFamily: 'Poppins-Bold' },
    light: { fontFamily: 'Poppins-Light' },
    italic: { fontFamily: 'Poppins-Italic' },
  };

  return (
    <RNText
      style={[
        globalStyles.text,
        variantStyles[variant],
        style
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
};

export default Text;