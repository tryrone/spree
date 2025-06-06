import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet,
  View, 
  TouchableOpacity, 
  TextInput, 
  Animated, 
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import img from '../../../assets/spree/sony.png'
import Text from '../../assecories/TextFont';
import { globalStyles } from '../../assecories/Globalstyle';
import { styles } from './tabStyles/StoreStyles';
import { productsGoods } from '../../Dummy Data/data';
import { useNavigation } from '@react-navigation/native';
import Categories from './storeDrop/Categories';
import Wishlist from './storeDrop/Wishlist';
import AnimatedProductCard from './animation/AnimatedProductCard';

const Store = () => {
  const [selectedCategory, setSelectedCategory] = useState('Explore');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [cartItems, setCartItems] = useState({});
  const [likedItems, setLikedItems] = useState({}); // New state for liked products
  const navigation = useNavigation();

  const dropdownAnim = useRef(new Animated.Value(0)).current;
  const searchAnim = useRef(new Animated.Value(-100)).current;
  const filterAnim = useRef(new Animated.Value(0)).current;

  // Sample product data
  const [products] = useState(productsGoods);

  const categories = ['Explore', 'Categories', 'Wishlist'];
  const filters = ['All', 'Stores', 'Pants', 'Dresses', 'Jackets', 'Accessories'];

  // Animation effects
  useEffect(() => {
    if (isDropdownOpen) {
      Animated.timing(dropdownAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(dropdownAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isDropdownOpen]);

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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
    if (category === "Categories") {
      <Categories/>
    }
  };

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
      [productId]: !prev[productId] // Toggle the liked state
    }));
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.store.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || 
                         product.category === selectedFilter ||
                         (selectedFilter === 'Stores' && product.store);
    return matchesSearch && matchesFilter;
  });

  const getTotalCartItems = () => {
    return Object.values(cartItems).reduce((sum, count) => sum + count, 0);
  };

  const renderProduct = (product, index) => (
    <AnimatedProductCard
      key={product.id}
      product={product}
      index={index}
      onAddToCart={handleAddToCart}
      onToggleLike={handleToggleLike}
      onMessageSeller={() => navigation.navigate('messageDets')}
      isLiked={likedItems[product.id]}
      cartCount={cartItems[product.id] || 0}
    />
  );

  // Render content based on selected category
  const renderContent = () => {
    if (selectedCategory === 'Categories') {
      return <Categories />;
    } else if (selectedCategory === 'Wishlist') {
      return <Wishlist />;
    } else {
      return (
        <>
          {/* Search Bar */}
          {isSearchActive && (
            <Animated.View
              style={[
                styles.searchContainer,
                { transform: [{ translateY: searchAnim }] },
              ]}
            >
              <TextInput
                style={styles.searchInput}
                placeholder="Search for Items here"
                placeholderTextColor="#9CA3AF"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity style={styles.cancelButton} onPress={toggleSearch}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* Filter Tabs */}
          {isSearchActive && (
            <Animated.View style={[styles.filterContainer, { opacity: filterAnim }]}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {filters.map((filter) => (
                  <TouchableOpacity
                    key={filter}
                    style={[
                      styles.filterTab,
                      selectedFilter === filter && styles.selectedFilterTab,
                    ]}
                    onPress={() => setSelectedFilter(filter)}
                  >
                    {filter === 'Stores' && (
                      <MaterialIcons
                        name="store"
                        size={16}
                        color={selectedFilter === filter ? '#FFFFFF' : '#6B7280'}
                        style={styles.filterIcon}
                      />
                    )}
                    <Text
                      style={[
                        styles.filterText,
                        selectedFilter === filter && styles.selectedFilterText,
                      ]}
                    >
                      {filter}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </Animated.View>
          )}

          {/* Products Grid */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.productsGrid}>
              {filteredProducts.map(renderProduct)}
            </View>
          </ScrollView>
        </>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.categoryButton} onPress={toggleDropdown}>
          <Text style={styles.categoryText}>{selectedCategory}</Text>
          <MaterialIcons
            name={isDropdownOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={24}
            color="#1A1A1A"
          />
        </TouchableOpacity>

        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton} onPress={toggleSearch}>
            <Feather name={isSearchActive ? 'x' : 'search'} size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="shopping-cart" size={24} color="#1A1A1A" />
            {getTotalCartItems() > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{getTotalCartItems()}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <Animated.View
          style={[
            styles.dropdown,
            {
              opacity: dropdownAnim,
              transform: [
                {
                  translateY: dropdownAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.dropdownItem,
                selectedCategory === category && styles.selectedDropdownItem,
              ]}
              onPress={() => selectCategory(category)}
            >
              <Text
                style={[
                  styles.dropdownText,
                  selectedCategory === category && styles.selectedDropdownText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      )}

      {/* Main Content */}
      {renderContent()}
    </SafeAreaView>
  );
};

export default Store;