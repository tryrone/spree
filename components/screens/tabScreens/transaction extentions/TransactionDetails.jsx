import React, { useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import Text from '../../../assecories/TextFont';
import { transactionDetails } from '../../../Dummy Data/data';
import { styles } from './TransactionStyle';
import ImageModel from '../../../assecories/modals/ImageModel';
import ContactModal from '../../../assecories/modals/ProfileModal';

// Static image mapping
const images = {
  cloth: require('../../../../assets/spree/cloth.png'),
};

const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const TimelineItem = ({ label, date, isLast, animation, delay }) => {
  // Create animated values for dot opacity and connector height
  const dotOpacity = useRef(new Animated.Value(0)).current;
  const connectorHeight = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Start animation after the specified delay
    Animated.sequence([
      // First animate the dot
      Animated.timing(dotOpacity, {
        toValue: 1,
        duration: 300,
        delay: delay,
        useNativeDriver: true,
      }),
      // Then animate the connector line (only if not the last item)
      Animated.parallel([
        !isLast ? Animated.timing(connectorHeight, {
          toValue: 1,
          duration: 400,
          useNativeDriver: false,
        }) : Animated.delay(0),
        // Animate content opacity
        Animated.timing(contentOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ])
    ]).start();
  }, [delay]);

  return (
    <View style={styles.timelineItem}>
      <View style={styles.timelineIconContainer}>
        <Animated.View 
          style={[
            styles.timelineIcon, 
            { opacity: dotOpacity }
          ]} 
        />
        {!isLast && (
          <Animated.View 
            style={[
              styles.timelineConnector, 
              { 
                height: connectorHeight.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, "100%"]
                }) 
              }
            ]} 
          />
        )}
      </View>
      <Animated.View 
        style={[
          styles.timelineContent,
          { opacity: contentOpacity }
        ]}
      >
        <Text style={styles.timelineLabel}>{label}</Text>
        <Text style={styles.timelineDate}>{date}</Text>
      </Animated.View>
    </View>
  );
};

const AnimatedDateRow = ({ label, value, delay }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      delay: delay,
      useNativeDriver: true,
    }).start();
  }, [delay]);

  return (
    <Animated.View style={[styles.dateRow, { opacity }]}>
      <Text style={styles.dateLabel}>{label}</Text>
      <Text style={styles.dateValue}>{value}</Text>
    </Animated.View>
  );
};



const TransactionDetails = ({ navigation }) => {
  // Access the first transaction object
  const { header, amount, buyerDetails, timeline, dates, note, productDetails } = transactionDetails[0];
  
  // Animation for the note text
  const noteOpacity = useRef(new Animated.Value(0)).current;

  // State for image modal
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  
  // State for contact modal
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);

  // Function to handle image click
  const handleImagePress = (imageKey) => {
    setSelectedImage(images[imageKey]);
    setIsImageModalVisible(true);
  };

  // Function to close image modal
  const closeImageModal = () => {
    setIsImageModalVisible(false);
    setSelectedImage(null);
  };
  
  // Function to toggle contact modal
  const toggleContactModal = () => {
    setIsContactModalVisible(!isContactModalVisible);
  };
  
  useEffect(() => {
    // Calculate base delay for note animation based on timeline and dates length
    const baseDelay = 300 + (timeline.length * 700) + (dates.length * 300);
    
    // Animate note
    Animated.timing(noteOpacity, {
      toValue: 1,
      duration: 300,
      delay: baseDelay,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <>
        <SafeAreaView style={styles.container}>
        <Text style={styles.titleText}>Transaction Details</Text>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.loadingContainer}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                <Text style={styles.headerText}>{header.status}</Text>
                <TouchableOpacity 
                    style={styles.messageButton}
                    onPress={toggleContactModal}
                >
                    <Text style={styles.messageButtonText}>{header.messageButtonText}</Text>
                </TouchableOpacity>
                </View>

                {/* Amount */}
                <View style={styles.amountContainer}>
                <Text style={styles.amountText}>{amount.value}</Text>
                <Text style={styles.initiatedText}>
                    This transaction was initiated by the{' '}
                    <Text style={styles.boldText}>{amount.initiatedBy}</Text>
                </Text>
                </View>

                {/* Buyer's Details */}
                <View style={styles.sectionContainer}>
                <View style={styles.sectionHeaderRow}>
                    <Text style={styles.sectionTitle}>Buyer's Details</Text>
                    <TouchableOpacity onPress={toggleContactModal}>
                    <Text style={styles.viewProfileText}>View profile</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.detailsBox}>
                    <DetailRow label="Buyer's Name" value={buyerDetails.name} />
                    <DetailRow label="Buyer's Number" value={buyerDetails.number} />
                </View>
                </View>

                {/* Transaction Timeline */}
                <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Transaction Timeline</Text>
                <View style={styles.timelineBox}>
                    {timeline.map((item, index) => (
                    <TimelineItem
                        key={index}
                        label={item.label}
                        date={item.date}
                        isLast={index === timeline.length - 1}
                        delay={300 + (index * 700)} // Add delay for sequential animation
                    />
                    ))}
                    {dates.map((date, index) => (
                    <AnimatedDateRow
                        key={index}
                        label={date.label}
                        value={date.value}
                        delay={300 + (timeline.length * 700) + (index * 300)} // Delay after timeline items
                    />
                    ))}
                    <Animated.Text style={[styles.noteText, { opacity: noteOpacity }]}>
                    {note}
                    </Animated.Text>
                </View>
                </View>

                {/* Product Details */}
                <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Product Details</Text>
                <View style={styles.detailsBox}>
                    <DetailRow label="Product Name" value={productDetails.name} />
                    <DetailRow label="Product Quality" value={productDetails.quality} />
                    <DetailRow label="Product Condition" value={productDetails.condition} />
                    <View style={styles.productImagesRow}>
                    <Text style={styles.detailLabel}>Product Image</Text>
                    <View style={styles.imagesContainer}>
                        {productDetails.images.map((key, index) => (
                        <TouchableOpacity key={index} onPress={() => handleImagePress(key)}>
                            <Image source={images[key]} style={styles.productImage} />
                        </TouchableOpacity>
                        ))}
                    </View>
                    </View>
                </View>
                </View>

                {/* Image Modal */}
                <ImageModel
                    isVisible={isImageModalVisible}
                    imageSource={selectedImage}
                    onClose={closeImageModal}
                />

            </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </SafeAreaView>
        {/* Contact Modal */}
        <ContactModal
        isVisible={isContactModalVisible}
        onClose={toggleContactModal}
        buyerDetails={{
            name: buyerDetails.name,
            number: buyerDetails.number,
            email: 'Adeleke@gmail.com',  
            address: '09, Harold Shodipo, GRA, Ikeja Lagos'
        }}
        />
    </>
  );
};



export default TransactionDetails;