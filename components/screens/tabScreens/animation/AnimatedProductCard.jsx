import React, { useEffect, useRef } from 'react';
import {
  Animated,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { styles } from '../tabStyles/StoreStyles';
import Text from '../../../assecories/TextFont';
import { globalStyles } from '../../../assecories/Globalstyle';
import { useNavigation } from '@react-navigation/native';
import { AddToCartIconButton } from '../../../assecories/CartComponents';

const AnimatedProductCard = ({ 
  product, 
  index, 
  onAddToCart, 
  onToggleLike, 
  onMessageSeller,
  isLiked, 
  cartCount 
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const navigation = useNavigation();

  useEffect(() => {
    // Stagger animation based on index
    const delay = index * 300; // 100ms delay between each item

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index]);

  const handlePress = (callback) => {
    // Add press animation
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

    if (callback) callback();
  };

  return (
    <Animated.View
      style={[
        styles.productCard,
        {
          opacity: fadeAnim,
          transform: [
            { translateY: slideAnim },
            { scale: scaleAnim },
          ],
        },
      ]}
    >
      <TouchableOpacity onPress={() => navigation.navigate("products")}>
        <View style={styles.productImageContainer}>
          <Image source={product.image} style={styles.productImage} />
          <Text style={styles.productPrice}>{product.price}</Text>
          <Text style={styles.productName}>{product.name}</Text>
          
          <TouchableOpacity 
            style={styles.addToCartButtons}
            onPress={() => handlePress(() => onToggleLike(product.id))}
            activeOpacity={0.7}
          >
            {isLiked ? (
              <AntDesign name="heart" size={24} color="red" />
            ) : (
              <AntDesign name="hearto" size={24} color="#000" />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.addToCartButton}
          >
            <AddToCartIconButton
              onPress={onAddToCart}
              productName={product.name}
              style={styles.customActionButton}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      
      <View style={globalStyles.storeRow}>
        <Text>{product.store}</Text>
        <TouchableOpacity 
          onPress={() => handlePress(onMessageSeller)}
          style={{
            borderColor:"#19141E",
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 8
          }}
          activeOpacity={0.7}
        >
          <Text>Message Seller</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.productStore}>{product.about}</Text>
    </Animated.View>
  );
};

export default AnimatedProductCard;