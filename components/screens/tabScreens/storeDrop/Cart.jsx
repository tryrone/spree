import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { cart, productsGoods } from '../../../Dummy Data/data'
import YouMayAlsoLike from './YouMayAlsoLike'
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification'
import Button from '../../../assecories/Button'

const Cart = () => {
  const [cartItems, setCartItems] = useState(cart)

  const updateQuantity = (id, change) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    )
  }

  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const formatPrice = (price) => {
    return `₦ ${price.toLocaleString()}`
  }

  const handleAddToCart = (productId) => {
    cartStorage.addItem(productId);
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Added to Cart!',
      textBody: 'Product successfully added to your cart',
    });
  };

  const renderCartItem = (item, index) => (
    <View key={item.id} style={styles.itemContainer}>
      {index === 0 && (
        <Text style={styles.storeName}>{item.store}</Text>
      )}
      {index === 2 && (
        <Text style={styles.storeName}>{item.store}</Text>
      )}
      
      <View style={styles.productRow}>
        <View style={styles.productImageContainer}>
          <Image source={item.image } style={styles.productImage} />
        </View>
        
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productDescription}>{item.description}</Text>
          <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
        </View>
        
        <View style={styles.quantityControls}>
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => removeItem(item.id)}
          >
            <Text style={styles.deleteIcon}>🗑️</Text>
          </TouchableOpacity>
          
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityText}>{item.quantity}</Text>
          </View>
          
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => updateQuantity(item.id, 1)}
          >
            <Text style={styles.addIcon}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

  return (
    <AlertNotificationRoot>
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.cartContent}>
                    {cartItems.map((item, index) => renderCartItem(item, index))}
                    
                    <View style={styles.subtotalContainer}>
                    <Text style={styles.subtotalLabel}>Subtotal</Text>
                    <Text style={styles.subtotalAmount}>NGN {calculateSubtotal().toLocaleString()}</Text>
                    </View>
                    
                    <TouchableOpacity style={styles.shippingContainer}>
                    <Text style={styles.shippingText}>Add Shipping address</Text>
                    <Text style={styles.shippingArrow}>›</Text>
                    </TouchableOpacity>
                </View>
                <YouMayAlsoLike
                    products={productsGoods}
                    categories={["Women's clothings", "Men's clothings", "Accessories", "Shoes"]}
                    onAddToCart={handleAddToCart}
                    maxProducts={6}
                    sectionTitle="You may also like"
                    />
            </ScrollView>
            <View style={styles.bottomContainer}>
                <Button
                    title="Checkout"
                />
            </View>
        </SafeAreaView>
    </AlertNotificationRoot>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfafe',
    position: "relative"
  },
  cartContent: {
    padding: 16,
  },
  itemContainer: {
    // marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginVertical: 12,
  },
  productRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
  },
  productImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    marginRight: 16,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  productDetails: {
    flex: 1,
    marginRight: 16,
  },
  productName: {
    fontSize: 14,
    fontWeight: '400',
    color: '#475467',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#98A2B3',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  quantityControls: {
    alignItems: 'center',
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-end"
  },
  deleteButton: {
    width: 28,
    height: 28,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: {
    fontSize: 12,
  },
  quantityContainer: {
    width: 48,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  addButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginTop: 20,
  },
  subtotalLabel: {
    fontSize: 16,
    color: '#666',
  },
  subtotalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  shippingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  shippingText: {
    fontSize: 16,
    color: '#666',
  },
  shippingArrow: {
    fontSize: 20,
    color: '#666',
  },
  bottomContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
})