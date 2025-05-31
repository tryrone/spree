import { 
  Keyboard, 
  KeyboardAvoidingView, 
  Platform, 
  SafeAreaView, 
  ScrollView, 
  FlatList, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  TouchableWithoutFeedback, 
  View, 
  Animated,
  Image
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import Feather from '@expo/vector-icons/Feather';
import Text from '../../assecories/TextFont';
import { useNavigation } from '@react-navigation/native';
import SearchComponent from '../../assecories/SearchComponent';
import MessageTab from '../../assecories/MessageTab';

// Import with error handling
let messageData;
try {
  const dataModule = require('../../Dummy Data/data');
  messageData = dataModule.messageData || [];
} catch (error) {
  console.warn('Could not load messageData, using empty array:', error);
  messageData = [];
}

const Messages = () => {
  // Ensure messageData is always an array
  const safeMessageData = Array.isArray(messageData) ? messageData : [];
  const [filteredData, setFilteredData] = useState(safeMessageData);
  const navigation = useNavigation();

  const handleFilteredData = (filtered) => {
    // Fix: Add null checking for filtered data
    setFilteredData(filtered && Array.isArray(filtered) ? filtered : []);
  };

  const renderMessage = ({ item, index }) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('messageDets')}
      style={styles.messageItem}
    >
      <View style={styles.messageRow}>
        <View style={styles.messageLeft}>
          <Image source={item.image} style={styles.storeImage} />
          <View style={styles.messageContent}>
            <Text style={styles.storeText}>{item.store}</Text>
            <Text style={styles.messageText}>{item.message}</Text>
          </View>
        </View>
        <View style={styles.messageRight}>
          <Text style={styles.dateText}>{item.date}</Text>
          <View
            style={[
              styles.statusIndicator,
              {
                backgroundColor: item.status === 'read' ? '#E8ECEF' : '#7A5AF8',
              },
            ]}
          >
            {item.status === 'unread' && <View style={styles.unreadDot} />}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Show empty state if no data
  if (!safeMessageData || safeMessageData.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <SearchComponent
          data={[]}
          onFilteredData={handleFilteredData}
          homeTabComponent={<MessageTab />}
          searchPlaceholder="Search Messages..."
          filters={['Read', 'Unread', 'Today', 'Yesterday', 'Last Week']}
        />
        <View style={styles.emptyContainer}>
            <Image 
              source={require("../../../assets/spree/message.png")}
            />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <SearchComponent
        data={safeMessageData}
        onFilteredData={handleFilteredData}
        homeTabComponent={<MessageTab />}
        searchPlaceholder="Search Messages..."
        filters={['Read', 'Unread']}
        dataType="message" // Add this prop for clarity
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.contentContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={filteredData}
            renderItem={renderMessage}
            keyExtractor={(item, index) => `${item.store}-${index}`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: 100,
    height: 138
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  listContent: {
  },
  messageItem: {
    paddingVertical: 17,
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECEF',
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  storeImage: {
    width: 52,
    height: 52,
    borderRadius: 20,
    marginRight: 12,
  },
  messageContent: {
    flex: 1,
  },
  storeText: {
    fontSize: 17,
    fontWeight: '400',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  messageText: {
    fontSize: 14,
    color: '#6B7280',
  },
  messageRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 12,
    color: '#000',
    marginBottom: 4,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#5A4FCF',
  },
});