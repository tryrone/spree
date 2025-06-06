import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F9FAFB',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: '#FFFFFF',
    },
    categoryButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    categoryText: {
      fontSize: 18,
      fontWeight: '400',
      color: '#1A1A1A',
      marginRight: 8,
    },
    headerIcons: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
    },
    iconButton: {
      position: 'relative',
    },
    cartBadge: {
      position: 'absolute',
      top: -8,
      right: -8,
      backgroundColor: '#EF4444',
      borderRadius: 10,
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cartBadgeText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '400',
    },
    dropdown: {
      backgroundColor: '#FFFFFF',
      marginHorizontal: 20,
      top: 60,
      borderRadius: 12,
      paddingVertical: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
      position: "absolute",
      zIndex: 9999,
      width: 143
    },
    dropdownItem: {
      paddingHorizontal: 20,
      paddingVertical: 12,
    },
    selectedDropdownItem: {
      backgroundColor: '#F3F4F6',
    },
    dropdownText: {
      fontSize: 16,
      color: '#6B7280',
    },
    selectedDropdownText: {
      color: '#1A1A1A',
      fontWeight: '400',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: '#FFFFFF',
      gap: 12,
    },
    searchInput: {
      flex: 1,
      height: 40,
      backgroundColor: '#F3F4F6',
      borderRadius: 20,
      paddingHorizontal: 16,
      fontSize: 16,
      color: '#1A1A1A',
    },
    cancelButton: {
      paddingHorizontal: 4,
    },
    cancelText: {
      fontSize: 16,
      color: '#6B7280',
    },
    filterContainer: {
      paddingVertical: 10,
      backgroundColor: '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: '#E5E7EB',
    },
    filterTab: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F3F4F6',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      marginLeft: 12,
      marginRight: 4,
    },
    selectedFilterTab: {
      backgroundColor: '#1A1A1A',
    },
    filterIcon: {
      marginRight: 6,
    },
    filterText: {
      fontSize: 14,
      color: '#6B7280',
      fontWeight: '400',
    },
    selectedFilterText: {
      color: '#FFFFFF',
    },
    content: {
      flex: 1,
      paddingTop: 20,
    },
    productsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 20,
      justifyContent: 'space-between',
    },
    productCard: {
      width: '100%',
      borderRadius: 12,
      marginBottom: 25,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    productImageContainer: {
      position: 'relative',
      marginBottom: 8,
    },
    productImage: {
      width: "100%",
      height: 403,
      borderRadius: 16,
      backgroundColor: '#F3F4F6',
    },
    productPrice: {
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
    productName: {
      position: 'absolute',
      top: 40,
      right: 16,
      fontSize: 16,
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
    productStore: {
      fontSize: 12,
      color: '#475367',
      marginBottom: 12,
    },
    addToCartButtons: {
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
      
      addToCartButton: {
        position: 'absolute',
        bottom: 10,
        left: 70,
        // Glass effect properties
        backgroundColor: 'rgba(255, 255, 255, 0.57)',
        backdropFilter: 'blur(16px)', // Note: This may not work on all React Native versions
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
      }
  });

export const SubCategoriesStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 24,
      backgroundColor: '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: '#F3F4F6',
      alignSelf: "flex-end"
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '400',
      color: '#1A1A1A',
    },
    headerIcons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconButton: {
      marginLeft: 16,
      position: 'relative',
    },
    cartBadge: {
      position: 'absolute',
      top: -8,
      right: -8,
      backgroundColor: '#EF4444',
      borderRadius: 10,
      minWidth: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cartBadgeText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '400',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: '#F3F4F6',
    },
    searchInput: {
      flex: 1,
      height: 40,
      backgroundColor: '#F9FAFB',
      borderRadius: 20,
      paddingHorizontal: 16,
      fontSize: 16,
      color: '#1F2937',
    },
    cancelButton: {
      marginLeft: 12,
    },
    cancelText: {
      fontSize: 16,
      color: '#6B7280',
    },
    filterContainer: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: '#F3F4F6',
    },
    filterTab: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginRight: 8,
      borderRadius: 9,
      backgroundColor: '#F9FAFB',
      flexDirection: 'row',
      alignItems: 'center',
    },
    selectedFilterTab: {
      backgroundColor: '#1F2937',
    },
    filterText: {
      fontSize: 14,
      fontWeight: '400',
      color: '#6B7280',
    },
    selectedFilterText: {
      color: '#FFFFFF',
    },
    filterIcon: {
      marginRight: 4,
    },
    content: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    productsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingBottom: 20,
    },
    productCard: {
      width: '48%',
      marginBottom: 20,
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
    },
    productImageContainer: {
      position: 'relative',
      borderRadius: 8,
      overflow: 'hidden',
    },
    productImage: {
      width: '100%',
      height: 280,
      resizeMode: 'cover',
    },
    heartButton: {
      position: 'absolute',
      top: 12,
      right: 12,
    //   backgroundColor: 'rgba(255, 255, 255, 0.9)',
    //   borderRadius: 20,
    //   padding: 8,
    //   elevation: 2,
    //   shadowColor: '#000',
    //   shadowOffset: {
    //     width: 0,
    //     height: 1,
    //   },
    //   shadowOpacity: 0.2,
    //   shadowRadius: 2,
    },
    addToCartButton: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
      flexDirection: 'row',
      alignItems: 'center',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    addCart: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        display: "flex",
        alignItems: "center",
        flexDirection: "row-reverse",
        gap: 10
    },
    addToCartText: {
      fontSize: 12,
      fontWeight: '500',
      marginLeft: 4,
      color: '#fff',
    },
    productInfo: {
        paddingTop: 10
    },
    productName: {
      fontSize: 14,
      fontWeight: '400',
      color: '#1A1A1A',
      marginBottom: 4,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 6,
      gap: 8
    },
    ratingText: {
      fontSize: 12,
      color: '#000',
      marginLeft: 4,
    },
    productPrice: {
      fontSize: 16,
      fontWeight: '700',
      color: '#1A1A1A',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 40,
    },
    emptyText: {
      fontSize: 16,
      color: '#6B7280',
      textAlign: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject, // Cover the entire image
        backgroundColor: '#0000005b',
        borderRadius: 8,
      },
  });