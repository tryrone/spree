import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, Animated, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Text from './TextFont';

const SearchComponent = ({
  data = [],
  onFilteredData,
  homeTabComponent,
  filters = ['Initiated', 'Paid', 'Closed', 'Settled', 'In dispute'],
  searchPlaceholder = "Search transactions...",
  containerStyle,
  searchInputStyle,
  filterTabStyle,
  selectedFilterTabStyle,
  dataType = 'transaction' // New prop to distinguish data type
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const searchAnim = useRef(new Animated.Value(-100)).current;
  const homeTabOpacity = useRef(new Animated.Value(1)).current;
  const filterTabsOpacity = useRef(new Animated.Value(0)).current;

  // Filter data based on search query and selected filter
  const filterData = (query, filter) => {
    let filteredData = [...data];

    if (dataType === 'transaction') {
      // Transaction filtering logic
      if (query.trim()) {
        filteredData = filteredData.map(section => ({
          ...section,
          data: section.data.filter(item =>
            item.name?.toLowerCase().includes(query.toLowerCase()) ||
            item.description?.toLowerCase().includes(query.toLowerCase()) ||
            item.role?.toLowerCase().includes(query.toLowerCase()) ||
            item.amount?.toLowerCase().includes(query.toLowerCase())
          )
        })).filter(section => section.data.length > 0);
      }

      if (filter) {
        filteredData = filteredData.map(section => ({
          ...section,
          data: section.data.filter(item => item.status === filter)
        })).filter(section => section.data.length > 0);
      }
    } else if (dataType === 'message') {
      // Message filtering logic
      if (query.trim()) {
        filteredData = filteredData.filter(item =>
          item.store?.toLowerCase().includes(query.toLowerCase()) ||
          item.message?.toLowerCase().includes(query.toLowerCase())
        );
      }

      if (filter) {
        if (['Read', 'Unread'].includes(filter)) {
          filteredData = filteredData.filter(item => item.status === filter.toLowerCase());
        } else if (['Today', 'Yesterday', 'Last Week'].includes(filter)) {
          // Add date-based filtering logic (you may need to adjust based on your date format)
          const now = new Date();
          filteredData = filteredData.filter(item => {
            const itemDate = new Date(item.date);
            if (filter === 'Today') {
              return itemDate.toDateString() === now.toDateString();
            } else if (filter === 'Yesterday') {
              const yesterday = new Date(now);
              yesterday.setDate(now.getDate() - 1);
              return itemDate.toDateString() === yesterday.toDateString();
            } else if (filter === 'Last Week') {
              const lastWeek = new Date(now);
              lastWeek.setDate(now.getDate() - 7);
              return itemDate >= lastWeek && itemDate <= now;
            }
            return true;
          });
        }
      }
    }

    return filteredData;
  };

  // Update filtered data whenever search query or filter changes
  useEffect(() => {
    const filtered = filterData(searchQuery, selectedFilter);
    onFilteredData && onFilteredData(filtered);
  }, [searchQuery, selectedFilter, data]);

  // Handle animations
  useEffect(() => {
    if (isSearchOpen) {
      Animated.parallel([
        Animated.timing(searchAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(homeTabOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(filterTabsOpacity, {
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
        Animated.timing(homeTabOpacity, {
          toValue: 1,
          duration: 200,
          delay: 100,
          useNativeDriver: true,
        }),
        Animated.timing(filterTabsOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setSelectedFilter(null);
        setSearchQuery('');
      });
    }
  }, [isSearchOpen]);

  const toggleSearch = () => {
    setIsSearchOpen(prev => !prev);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(selectedFilter === filter ? null : filter);
  };

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  return (
    <>
      <View style={[styles.tab, containerStyle]}>
        <Animated.View style={[styles.homeTabContainer, { opacity: homeTabOpacity }]}>
          {homeTabComponent}
        </Animated.View>
        <TouchableOpacity style={styles.searchButton} onPress={toggleSearch}>
          <Feather name={isSearchOpen ? 'x' : 'search'} size={24} color="#1A1A1A" />
        </TouchableOpacity>
      </View>

      {isSearchOpen && (
        <>
          <Animated.View style={[styles.searchContainer, { transform: [{ translateY: searchAnim }] }]}>
            <TextInput
              style={[styles.searchInput, searchInputStyle]}
              placeholder={searchPlaceholder}
              placeholderTextColor="#6B7280"
              value={searchQuery}
              onChangeText={handleSearchChange}
            />
          </Animated.View>

          <Animated.View style={[styles.filterTabsContainer, { opacity: filterTabsOpacity }]}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterTab,
                  filterTabStyle,
                  selectedFilter === filter && styles.selectedFilterTab,
                  selectedFilter === filter && selectedFilterTabStyle,
                ]}
                onPress={() => handleFilterSelect(filter)}
              >
                <Text
                  style={[
                    styles.filterTabText,
                    selectedFilter === filter && styles.selectedFilterTabText,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 0,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  homeTabContainer: {
    flex: 1,
  },
  searchButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  searchInput: {
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1A1A1A',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  filterTabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#E8ECEF',
    alignItems: 'center',
  },
  selectedFilterTab: {
    backgroundColor: '#19141E',
  },
  filterTabText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  selectedFilterTabText: {
    color: '#FFFFFF',
  },
});

export default SearchComponent;