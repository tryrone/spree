import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AddToCartIconButton } from '../../../assecories/CartComponents';
import Like from '../../../assecories/Like';

const { width } = Dimensions.get('window');

const YouMayAlsoLike = ({ 
  products = [], 
  categories = [], 
  onAddToCart,
  maxProducts = 6,
  sectionTitle = "You may also like"
}) => {
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
          onPress={() => onAddToCart(product.id)}
          productName={product.name}
          style={styles.actionButton}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{sectionTitle}</Text>
      
      {/* Categories */}
      {categories.length > 0 && (
        <View style={styles.categoriesContainer}>
          {categories.map((category, index) => (
            <Text key={index} style={styles.categoryTag}>
              {category}
            </Text>
          ))}
        </View>
      )}
      
      {/* Related Products Grid */}
      <View style={styles.relatedProductsGrid}>
        {products.slice(0, maxProducts).map(renderRelatedProduct)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 12,
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
    backdropFilter: 'blur(16px)',
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
    backdropFilter: 'blur(16px)',
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
});

export default YouMayAlsoLike;