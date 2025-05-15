import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import SplashScreen from './components/Splashscreen';
import RootNavigator from './components/navigator/RootNavigator';

export default function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load multiple font weights and styles
        await Font.loadAsync({
          'Poppins': require('./assets/font/Poppins-Regular.ttf'),
          'Poppins-Bold': require('./assets/font/Poppins-Bold.ttf'),
          'Poppins-Light': require('./assets/font/Poppins-Light.ttf'),
          'Poppins-Italic': require('./assets/font/Poppins-Italic.ttf'),
        });

        // Simulate a delay (optional, to match your 5-second splash screen)
        await new Promise(resolve => setTimeout(resolve, 3000));
      } catch (error) {
        console.error('Error during app preparation', error);
      } finally {
        // Set app as ready after font loading and timeout
        setAppReady(true);
      }
    }

    prepare();
  }, []);

  // Show splash screen while app is not ready
  if (!appReady) {
    return <SplashScreen />;
  }

  return (
    <RootNavigator style={styles.loadingContainer}/>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});