import React, { useEffect, useRef } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  Image,
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import Text from '../TextFont';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

// Get screen dimensions
const { height } = Dimensions.get('window');

/**
 * Contact Modal Component
 *
 * A reusable sliding modal that displays contact information and actions
 *
 * @param {boolean} isVisible - Controls the visibility of the modal
 * @param {function} onClose - Function to call when closing the modal
 * @param {object} buyerDetails - Object containing buyer information (name, number, email, address)
 * @returns {React.Component}
 */
const ContactModal = ({ isVisible, onClose, buyerDetails }) => {
  const slideAnimation = useRef(new Animated.Value(height)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      const animationTimeout = setTimeout(() => {
        Animated.parallel([
          Animated.timing(backdropOpacity, {
            toValue: 0.5,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.spring(slideAnimation, {
            toValue: 0,
            tension: 50,
            friction: 8,
            useNativeDriver: true,
          }),
        ]).start();
      }, 10);
      return () => clearTimeout(animationTimeout);
    } else {
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnimation, {
          toValue: height,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <Modal transparent visible={isVisible} animationType="none" onRequestClose={onClose}>
      <View style={styles.modalWrapper}>
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[styles.modalContainer, { transform: [{ translateY: slideAnimation }] }]}
        >
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
                style={styles.profileImage}
              />
            </View>
          </View>

          <View style={styles.contactOptions}>
            <TouchableOpacity style={styles.contactButton}>
              <View style={styles.iconContainer}>
                <AntDesign name="message1" size={24} color="black" />
              </View>
              <Text style={styles.buttonText}>Message</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactButton}>
              <View style={styles.iconContainer}>
                <Feather name="phone" size={24} color="black" />
              </View>
              <Text style={styles.buttonText}>Call</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.modalTitle}>Buyer's details</Text>
          </View>

          {/* Scrollable details section */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollViewContainer}
            contentContainerStyle={styles.scrollViewContent}
          >
            <View style={styles.detailsSection}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Buyer's Name</Text>
                <Text style={styles.detailValue}>{buyerDetails.name}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Phone Number</Text>
                <Text style={styles.detailValue}>{buyerDetails.number}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Email Address</Text>
                <Text style={styles.detailValue}>{buyerDetails.email || 'user@example.com'}</Text>
              </View>

              {buyerDetails.address && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Address</Text>
                  <Text style={styles.detailValue}>{buyerDetails.address}</Text>
                </View>
              )}
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

// Styles for the contact modal
const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
  },
  modalContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F7F9FC',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 20,
    maxHeight: height * 0.7,
    marginHorizontal: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#344054',
    paddingBottom: 15,
    paddingLeft: 8,
    paddingTop: 30,
  },
  closeButton: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
    marginBottom: 10,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  contactOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  contactButton: {
    alignItems: 'center',
    marginHorizontal: 30,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#555',
  },
  detailsSection: {
    borderWidth: 1,
    borderColor: '#E7E7E7',
    padding: 20,
    backgroundColor: '#FCFCFD',
    borderRadius: 8,
  },
  detailRow: {
    marginBottom: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECEF',
  },
  detailLabel: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '400',
  },
  scrollViewContainer: {
    flex: 1, // Allow ScrollView to take remaining space
  },
  scrollViewContent: {
    flexGrow: 1, // Ensure content can expand
    paddingBottom: 40, // Increased padding for better scrolling experience
  },
});

export default ContactModal;