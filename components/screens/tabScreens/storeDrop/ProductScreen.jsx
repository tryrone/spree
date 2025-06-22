import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { productData, productsGoods } from '../../../Dummy Data/data';
import Entypo from '@expo/vector-icons/Entypo';
import { ALERT_TYPE, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import Like from '../../../assecories/Like';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { globalStyles } from '../../../assecories/Globalstyle';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { AddToCartButton, AddToCartIconButton, CartIconButton, useCart } from '../../../assecories/CartComponents';
import cartStorage from '../../../assecories/CartStorage';
import YouMayAlsoLike from './YouMayAlsoLike';

const { width } = Dimensions.get('window');

const ProductScreen = () => {
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('#D2691E');
  const [quantity, setQuantity] = useState(1);
  const { addToCart, getTotalItems } = useCart();
  const navigation = useNavigation();

// show less description settings
const [expanded, setExpanded] = useState(false);
const maxWords = 10;

const words = productData.description.split(' ');
const needsTruncate = words.length > maxWords;
const displayText = words.slice(0, expanded ? words.length : maxWords).join(' ');
// show less description settings

  const carouselItems = [
    {
      id: '1',
      image: require('../../../../assets/spree/store/bag1.png'),
    },
    {
      id: '2',
      image: require('../../../../assets/spree/store/bag2.png'),
    },
    {
      id: '3',
      image: require('../../../../assets/spree/store/bag3.png'),
    }
  ];

  // Animation values
  const slideAnim = useRef(new Animated.Value(0)).current;
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
    }, 2000); // Rotate every 5 seconds

    return () => clearInterval(autoRotate);
  }, [activeIndex]);

  const renderSizeButton = (size) => (
    <TouchableOpacity
      key={size}
      style={[
        styles.sizeButton,
        selectedSize === size && styles.selectedSizeButton
      ]}
      onPress={() => setSelectedSize(size)}
    >
      <Text style={[
        styles.sizeText,
        selectedSize === size && styles.selectedSizeText
      ]}>
        {size}
      </Text>
    </TouchableOpacity>
  );

  const renderColorButton = (color) => (
    <TouchableOpacity
      key={color}
      style={[
        styles.colorButton,
        { backgroundColor: color },
        selectedColor === color && styles.selectedColorButton
      ]}
      onPress={() => setSelectedColor(color)}
    />
  );

  const handleAddToCart = (productId) => {
    cartStorage.addItem(productId);
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Added to Cart!',
      textBody: 'Product successfully added to your cart',
    });
  };

  const renderRelatedProduct = (product) => (
    <View key={product.id} style={styles.relatedProductCard}>
      <Image source={product.image} style={styles.relatedProductImage} />
      <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.4)']}
          style={{
            ...StyleSheet.absoluteFillObject,
            borderRadius: 8,
          }}
        />
      <Text style={styles.relatedProductPrice}>{product.price}</Text>
      <Text style={styles.relatedProductName}>{product.name}</Text>
      <View style={styles.relatedProductActions}>
        {/* like */}
        <View style={styles.actionButtons}>
            <Like/>
        </View>
        <AddToCartIconButton
            onPress={handleAddToCart}
            productName={product.name}
            style={styles.actionButton}
        />
      </View>
    </View>
  );

  return (
    <AlertNotificationRoot>
        <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backButtonText}></Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>A&M Thrift Store</Text>
            <TouchableOpacity style={styles.menuButton}>
            <CartIconButton
                cartCount={getTotalItems()}
                onPress={() => navigation.navigate('Cart')}
            />
            </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Product Image */}
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

            <View style={{
                display: "flex", 
                flexDirection: "row-reverse", 
                justifyContent: "space-between", 
                alignItems: "flex-end", 
                marginBottom: 15
            }}>
                {/* Exportable like button */}
                <Like/>

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
        </View>

            {/* Product Info */}
            <View style={styles.productInfo}>
            <Text style={styles.productPrice}>{productData.price}</Text>
            <View style={styles.productTitleRow}>
                <Text style={styles.productName}>{productData.name}</Text>
                <View style={styles.ratingContainer}>
                <Text style={styles.ratingText}>
                    ⭐ {productData.rating} ({productData.reviews}) 
                </Text>
                    <Entypo name="chevron-right" size={24} color="black" />
                </View>
            </View>
            {/* line */}
            <View style={styles.line}/>
            </View>


            {/* Size Selection */}
            <View style={styles.section}>
            <Text style={styles.sectionTitle}>Size</Text>
            <View style={styles.sizeContainer}>
                {productData.sizes.map(renderSizeButton)}
            </View>
            </View>

            {/* Color Selection */}
            <View style={styles.section}>
            <Text style={styles.sectionTitle}>Color</Text>
            <View style={styles.colorContainer}>
                {productData.colors.map(renderColorButton)}
            </View>
            </View>

            {/* Quantity */}
            <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantityContainer}>
                <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                >
                <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity
                style={styles.quantityButtons}
                onPress={() => setQuantity(quantity + 1)}
                >
                <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
            </View>
            {/* line */}
            <View style={styles.line}/>
            </View>

            {/* Description */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.descriptionText}>
                    {displayText}{needsTruncate && !expanded && '... '}
                    {needsTruncate && (
                    <TouchableOpacity onPress={() => setExpanded(!expanded)}>
                        <Text style={styles.readMoreText}>
                        {expanded ? 'Read less' : 'Read more'}
                        </Text>
                    </TouchableOpacity>
                    )}
                </Text>
                <View style={styles.line} />
            </View>

            {/* Store Info */}
            <TouchableOpacity style={styles.storeInfo}>
            <View style={{
                display: "flex",
                flexDirection: "row",
                gap: 220
            }}>
                <View>                     
                    <Text style={styles.storeIcon}>🏪</Text>
                    <Text style={styles.storeName}>{productData.store}</Text>
                </View>
                <View>
                    <Text style={styles.chevron}>›</Text>
                </View>
            </View>
            <View style={styles.storeDetails}>
                <View style={styles.storeStats}>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>4.90</Text>
                    <Text style={styles.statLabel}>Rating</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>40</Text>
                    <Text style={styles.statLabel}>Items</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>1,100</Text>
                    <Text style={styles.statLabel}>Items sold</Text>
                </View>
                </View>
            </View>
            {/* line */}
            <View style={styles.line}/>
            </TouchableOpacity>


            {/* You may also like */}
            <YouMayAlsoLike
                products={productsGoods}
                categories={["Women's clothings", "Men's clothings", "Accessories", "Shoes"]}
                onAddToCart={handleAddToCart}
                maxProducts={6}
                sectionTitle="You may also like"
            />
        </ScrollView>

        {/* Add to Cart Button */}
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.message} onPress={() => navigation.navigate("messageDets")}>
                    <MaterialCommunityIcons name="message-text-outline" size={24} color="#6938EF" />
                </TouchableOpacity>
                
                <AddToCartButton
                    onPress={() => addToCart(productData.id)}
                    style={{ width: 294 }}
                />
            </View>
        </SafeAreaView>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  line: {
    borderWidth: 1,
    borderColor: "#EAECF0",
    width: "100%",
    marginVertical: 25
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
//   slider
  carouselContainer: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: "#e8e9e9",
    marginBottom: 25
  },
  slideContainer: {
    flexDirection: 'row',
    height: 350,
  },
  slide: {
    width: width - 0, // Account for container padding
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  slideImage: {
    width: 300,
    height: 310,
  },
//   pagination
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: 'center',
    marginBottom: 15,
    marginLeft: 15
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: '#D0D5DD',
    marginHorizontal: 4
  },
  paginationDotActive: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: '#fff'
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  menuButton: {
    padding: 8,
  },
  menuButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: '#f8f8f8',
    height: 250,
    marginBottom: 20,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  likeButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 7,
  },
  likeButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  productInfo: {
    paddingHorizontal: 16,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: '400',
    marginBottom: 8,
  },
  productTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productName: {
    fontSize: 16,
    color: '#475467',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#000',
  },
  section: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 12,
  },
  sizeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  sizeButton: {
    width: 49,
    height: 28,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: "#98A2B34D",
    borderWidth: 1
  },
  selectedSizeButton: {
    backgroundColor: '#000',
  },
  sizeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  selectedSizeText: {
    color: '#fff',
  },
  colorContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  colorButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#98A2B34D',
  },
  selectedColorButton: {
    borderColor: '#000',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  quantityButton: {
    width: 29,
    height: 29,
    borderRadius: 4,
    backgroundColor: '#a09fa4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtons: {
    width: 29,
    height: 29,
    borderRadius: 4,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: 23,
    fontWeight: '600',
    color: "#fff"
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '500',
    minWidth: 20,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
  },
  readMoreText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  storeInfo: {
    flexDirection: "column",
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 24,
    gap: 20
  },
  storeIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  storeIcon: {
    fontSize: 20,
  },
  storeDetails: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 8,
  },
  storeStats: {
    flexDirection: 'row',
    gap: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '400',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  chevron: {
    fontSize: 18,
    color: '#666',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  categoryTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 16,
    fontSize: 12,
    color: '#666',
  },
  relatedProductsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  relatedProductCard: {
    position: 'relative',
    width: (width - 48) / 2,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
  },
  relatedProductImage: {
    width: '100%',
    height: 231,
    borderRadius: 8,
  },
  relatedProductPrice: {
    position: 'absolute',
    top: 8,
    right: 8,
    color: '#000',
    fontSize: 18,
    fontWeight: '400',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  relatedProductName: {
    position: 'absolute',
    top: 40,
    right: 16,
    fontSize: 10,
    fontWeight: '400',
    color: '#1A1A1A',
    marginTop: 10,
    backgroundColor: "#FFFFFF4D",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.57)',
    backdropFilter: 'blur(16px)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  relatedProductActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    // Glass effect properties
    backgroundColor: 'rgba(255, 255, 255, 0.57)',
    backdropFilter: 'blur(16px)', // Note: This may not work on all React Native versions\
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // For Android shadow
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  actionButtons: {
    position: 'absolute',
    bottom: 10,
    left: 70,
    // Glass effect properties
    backgroundColor: 'rgba(255, 255, 255, 0.57)',
    backdropFilter: 'blur(16px)', // Note: This may not work on all React Native versions\
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5, // For Android shadow
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 14,
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
  addToCartButton: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    width: 294
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  message: {
    borderColor: "#BDB4FE",
    borderWidth: 1,
    padding: 10,
    borderRadius: 6
  }
});

export default ProductScreen;