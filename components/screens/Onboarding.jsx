import { StyleSheet, TouchableOpacity, View, Image, Animated, Dimensions, Easing } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Button from '../assecories/Button';
import Text from '../assecories/TextFont';

const { width } = Dimensions.get('window');

const Onboarding = () => {
  const navigation = useNavigation();
  const carouselItems = [
    {
      id: '1',
      image: require('../../assets/spree/onboarding/onboard1.png'),
      title: 'Secure Transactions',
      description: 'Making every transaction a worry-free experience'
    },
    {
      id: '2',
      image: require('../../assets/spree/onboarding/onboard2.png'),
      title: 'Shop smarter not harder',
      description: 'Discover the joy of hassle-free shopping with Spree'
    }
  ];

  // Animation values
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  // Text animation values
  const textFadeAnim = useRef(new Animated.Value(1)).current;
  const textTranslateY = useRef(new Animated.Value(0)).current;

  // Function to handle automatic carousel rotation
  useEffect(() => {
    const autoRotate = setInterval(() => {
      const nextIndex = (activeIndex + 1) % carouselItems.length;
      
      // Animate text out
      Animated.parallel([
        Animated.timing(textFadeAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateY, {
          toValue: -20,
          duration: 400,
          useNativeDriver: true,
        })
      ]).start(() => {
        // Animate slide transition
        Animated.timing(slideAnim, {
          toValue: -width * nextIndex,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.ease
        }).start();
        
        // Reset text animation values for next slide
        textTranslateY.setValue(20);
        
        // Animate text in for new slide
        Animated.parallel([
          Animated.timing(textFadeAnim, {
            toValue: 1,
            duration: 400,
            delay: 300,
            useNativeDriver: true,
          }),
          Animated.timing(textTranslateY, {
            toValue: 0,
            duration: 400,
            delay: 300,
            useNativeDriver: true,
          })
        ]).start();
        
        setActiveIndex(nextIndex);
      });
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(autoRotate);
  }, [activeIndex]);

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        {/* Carousel Images */}
        <Animated.View 
          style={[
            styles.slideContainer, 
            { transform: [{ translateX: slideAnim }] }
          ]}
        >
          {carouselItems.map((item) => (
            <View key={item.id} style={styles.slide}>
              <Image 
                source={item.image}
                style={styles.slideImage}
                resizeMode="cover"
              />
            </View>
          ))}
        </Animated.View>

        {/* Carousel Text */}
        <View style={styles.textContainer}>
          <Animated.Text 
            style={[
              styles.titleText,
              { 
                opacity: textFadeAnim,
                transform: [{ translateY: textTranslateY }]
              }
            ]}
          >
            {carouselItems[activeIndex].title}
          </Animated.Text>
          <Animated.Text 
            style={[
              styles.descriptionText,
              { 
                opacity: textFadeAnim,
                transform: [{ translateY: textTranslateY }]
              }
            ]}
          >
            {carouselItems[activeIndex].description}
          </Animated.Text>
        </View>

        {/* Pagination Dots */}
        <View style={styles.paginationContainer}>
          {carouselItems.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.paginationDot,
                activeIndex === index ? styles.paginationDotActive : {}
              ]} 
            />
          ))}
        </View>
      </View>

      <View style={styles.buttons}>
        <Button
          title='Get Started'
          onPress={() => navigation.navigate('signUp')}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('signIn')}
          style={styles.body}
        >
          <Text style={styles.text}>Login to account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF'
  },
  carouselContainer: {
    width: '100%',
    overflow: 'hidden',
    marginTop: 40
  },
  slideContainer: {
    flexDirection: 'row',
    height: 350
  },
  slide: {
    width: width - 0, // Account for container padding
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  slideImage: {
    width: 307,
    height: 330,
    borderRadius: 16
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: 50,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#333333'
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666666',
    paddingHorizontal: 20
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 2,
    backgroundColor: '#D9D6FE',
    marginHorizontal: 4
  },
  paginationDotActive: {
    width: 16,
    height: 7.11,
    borderRadius: 2,
    backgroundColor: '#5925DC'
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    gap: 25,
    marginBottom: 20
  },
  body: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "transparent",
    borderRadius: 8,
    width: "100%",
    borderWidth: 1,
    borderColor: "#CCCCCC"
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: "#000",
    textAlign: "center"
  }
});