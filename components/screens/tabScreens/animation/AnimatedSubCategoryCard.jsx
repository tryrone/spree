import React, { useEffect, useRef } from 'react';
import {
  Animated,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import { SubCategoriesStyles } from '../tabStyles/StoreStyles';
import Text from '../../../assecories/TextFont';

const AnimatedSubCategoryCard = ({ 
  product, 
  index, 
  onAddToCart, 
  onToggleLike, 
  isLiked 
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Stagger animation based on index with slight rotation for visual interest
    const delay = index * 300; // 120ms delay between each item

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
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index]);

  const handlePress = (callback) => {
    // Add press animation with slight bounce
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.92,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 300,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();

    if (callback) callback();
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-2deg', '0deg'],
  });

  return (
    <Animated.View
      style={[
        SubCategoriesStyles.productCard,
        {
          opacity: fadeAnim,
          transform: [
            { translateY: slideAnim },
            { scale: scaleAnim },
            { rotate: rotation },
          ],
        },
      ]}
    >
      <View style={SubCategoriesStyles.productImageContainer}>
        <Image source={product.image} style={SubCategoriesStyles.productImage} />
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.6)']}
          style={{
            ...StyleSheet.absoluteFillObject,
            borderRadius: 8,
          }}
        />
        
        {/* Heart Icon */}
        <TouchableOpacity 
          style={SubCategoriesStyles.heartButton}
          onPress={() => handlePress(() => onToggleLike(product.id))}
          activeOpacity={0.7}
        >
          {isLiked ? (
            <AntDesign name="heart" size={20} color="red" />
          ) : (
            <AntDesign name="hearto" size={20} color="#fff" />
          )}
        </TouchableOpacity>

        {/* Add to Cart Button */}
        <TouchableOpacity 
          style={SubCategoriesStyles.addCart}
          onPress={() => handlePress(() => onAddToCart(product.id))}
          activeOpacity={0.7}
        >
          <MaterialIcons 
            name="add-shopping-cart" 
            size={18} 
            color="#000" 
            style={SubCategoriesStyles.addToCartButton} 
          />
          <Text style={SubCategoriesStyles.addToCartText}>Add to cart</Text>
        </TouchableOpacity>
      </View>

      {/* Product Info */}
      <View style={SubCategoriesStyles.productInfo}>
        <Text style={SubCategoriesStyles.productName}>{product.name}</Text>
        <View style={SubCategoriesStyles.ratingContainer}>
          {[...Array(5)].map((_, starIndex) => (
            <AntDesign 
              key={starIndex} 
              name="star" 
              size={12} 
              color={starIndex < Math.floor(product.rating) ? "#FFD700" : "#E5E7EB"} 
            />
          ))}
          <Text style={SubCategoriesStyles.ratingText}>({product.rating})</Text>
        </View>
        <Text style={SubCategoriesStyles.productPrice}>{product.price}</Text>
      </View>
    </Animated.View>
  );
};

export default AnimatedSubCategoryCard;