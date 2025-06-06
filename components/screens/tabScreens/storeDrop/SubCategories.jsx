import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  TouchableOpacity, 
  TextInput,
  Animated,
  ScrollView,
  SafeAreaView,
  Image,
  StyleSheet
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { SubCategoriesStyles } from '../tabStyles/StoreStyles';
import { subCategoryProducts } from '../../../Dummy Data/data';
import Text from '../../../assecories/TextFont';
import { LinearGradient } from 'expo-linear-gradient';
import AnimatedSubCategoryCard from '../animation/AnimatedSubCategoryCard';

const SubCategories = () => {
  const [cartItems, setCartItems] = useState({});
  const [likedItems, setLikedItems] = useState({});
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const navigation = useNavigation();

  const searchAnim = useRef(new Animated.Value(-100)).current;
  const filterAnim = useRef(new Animated.Value(0)).current;

  const filters = ['All', 'Shirts', 'Pants', 'Dresses', 'Jackets', 'Accessories'];

  // Animation effects
  useEffect(() => {
    if (isSearchActive) {
      Animated.parallel([
        Animated.timing(searchAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(filterAnim, {
          toValue: 1,
          duration: 300,
          delay: 100,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(searchAnim, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(filterAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setSearchQuery('');
        setSelectedFilter('All');
      });
    }
  }, [isSearchActive]);

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
  };

  const handleAddToCart = (productId) => {
    setCartItems(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const handleToggleLike = (productId) => {
    setLikedItems(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  // Filter products based on search query and selected filter
  const filteredProducts = subCategoryProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || 
                         product.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((sum, count) => sum + count, 0);
  };

  const renderProduct = (product, index) => (
    <AnimatedSubCategoryCard
      key={product.id}
      product={product}
      index={index}
      onAddToCart={handleAddToCart}
      onToggleLike={handleToggleLike}
      isLiked={likedItems[product.id]}
    />
  );

  return (
    <SafeAreaView style={SubCategoriesStyles.container}>
      {/* Header with Search */}
      <View style={SubCategoriesStyles.header}>
        <View style={SubCategoriesStyles.headerIcons}>
          <TouchableOpacity style={SubCategoriesStyles.iconButton} onPress={toggleSearch}>
            <Feather name={isSearchActive ? 'x' : 'search'} size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <TouchableOpacity style={SubCategoriesStyles.iconButton}>
            <MaterialIcons name="shopping-cart" size={24} color="#1A1A1A" />
            {getTotalCartItems() > 0 && (
              <View style={SubCategoriesStyles.cartBadge}>
                <Text style={SubCategoriesStyles.cartBadgeText}>{getTotalCartItems()}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      {isSearchActive && (
        <Animated.View
          style={[
            SubCategoriesStyles.searchContainer,
            { transform: [{ translateY: searchAnim }] },
          ]}
        >
          <TextInput
            style={SubCategoriesStyles.searchInput}
            placeholder="Search for Items here"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={SubCategoriesStyles.cancelButton} onPress={toggleSearch}>
            <Text style={SubCategoriesStyles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Filter Tabs */}
      {isSearchActive && (
        <Animated.View style={[SubCategoriesStyles.filterContainer, { opacity: filterAnim }]}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  SubCategoriesStyles.filterTab,
                  selectedFilter === filter && SubCategoriesStyles.selectedFilterTab,
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text
                  style={[
                    SubCategoriesStyles.filterText,
                    selectedFilter === filter && SubCategoriesStyles.selectedFilterText,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
      )}

      <ScrollView style={SubCategoriesStyles.content} showsVerticalScrollIndicator={false}>
        <View style={SubCategoriesStyles.productsGrid}>
          {filteredProducts.map(renderProduct)}
        </View>
        {filteredProducts.length === 0 && (
          <View style={SubCategoriesStyles.emptyContainer}>
            <Text style={SubCategoriesStyles.emptyText}>No products found</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubCategories;