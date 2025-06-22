import React, { useState, useEffect } from 'react';
import { 
  TouchableOpacity, 
  Text, 
  View, 
  StyleSheet 
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import cartStorage from './CartStorage';

// Add to Cart Button Component
export const AddToCartButton = ({ 
  onPress, 
  title = "Add to cart", 
  style = {}, 
  textStyle = {},
  disabled = false,
  productId,
  productName = "Item"
}) => {
  const handlePress = () => {
    if (productId) {
      cartStorage.addItem(productId);
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Added to Cart!',
        textBody: `${productName} added to your cart`,
      });
    }
    if (onPress) onPress();
  };

  return (
    <TouchableOpacity 
      style={[styles.addToCartButton, style, disabled && styles.disabledButton]} 
      onPress={handlePress}
      disabled={disabled}
    >
      <Text style={[styles.addToCartText, textStyle, disabled && styles.disabledText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

// Cart Icon Button Component
export const CartIconButton = ({ 
  onPress, 
  iconSize = 24, 
  iconColor = "#1A1A1A",
  style = {},
  badgeStyle = {},
  showBadge = true 
}) => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Initial count
    setCartCount(cartStorage.getTotalItems());

    // Subscribe to cart changes
    const unsubscribe = cartStorage.subscribe(() => {
      setCartCount(cartStorage.getTotalItems());
    });

    return unsubscribe;
  }, []);

  return (
    <TouchableOpacity style={[styles.iconButton, style]} onPress={onPress}>
      <MaterialIcons name="shopping-cart" size={iconSize} color={iconColor} />
      {showBadge && cartCount > 0 && (
        <View style={[styles.cartBadge, badgeStyle]}>
          <Text style={styles.cartBadgeText}>{cartCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

// Add to Cart Icon Button
export const AddToCartIconButton = ({ 
  onPress, 
  iconSize = 23, 
  iconColor = "#000",
  style = {},
  productId,
  productName = "Item"
}) => {
  const handlePress = () => {
    if (productId) {
      cartStorage.addItem(productId);
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Added to Cart!',
        textBody: `${productName} added to your cart`,
      });
    }
    if (onPress) onPress(productId);
  };

  return (
    <TouchableOpacity style={[styles.actionButton, style]} onPress={handlePress}>
      <MaterialIcons name="add-shopping-cart" size={iconSize} color={iconColor} />
    </TouchableOpacity>
  );
};

// Cart Manager Hook
export const useCart = () => {
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    // Initial state
    setCartItems(cartStorage.getAllItems());

    // Subscribe to changes
    const unsubscribe = cartStorage.subscribe((items) => {
      setCartItems(items);
    });

    return unsubscribe;
  }, []);

  const addToCart = (productId, quantity = 1) => {
    cartStorage.addItem(productId, quantity);
  };

  const removeFromCart = (productId) => {
    cartStorage.removeItem(productId);
  };

  const updateQuantity = (productId, quantity) => {
    cartStorage.updateQuantity(productId, quantity);
  };

  const getTotalItems = () => {
    return cartStorage.getTotalItems();
  };

  const getItemCount = (productId) => {
    return cartStorage.getItemCount(productId);
  };

  const clearCart = () => {
    cartStorage.clearCart();
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getItemCount,
    clearCart
  };
};

const styles = StyleSheet.create({
  // Add to Cart Button Styles
  addToCartButton: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 200,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  disabledText: {
    color: '#999',
  },

  // Cart Icon Button Styles
  iconButton: {
    position: 'relative',
    padding: 8,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },

  // Add to Cart Icon Button Styles
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});