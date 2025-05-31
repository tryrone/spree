import { 
  Keyboard, 
  KeyboardAvoidingView, 
  Platform, 
  SafeAreaView, 
  ScrollView, 
  SectionList, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  TouchableWithoutFeedback, 
  View, 
  Animated 
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import Feather from '@expo/vector-icons/Feather';
import HomeTab from '../../assecories/HomeTab';
import { transactionData } from '../../Dummy Data/data';
import Text from '../../assecories/TextFont';
import { useNavigation } from '@react-navigation/native';
import SearchComponent from '../../assecories/SearchComponent';

const Transactions = () => {
  const [filteredData, setFilteredData] = useState(transactionData);
  const navigation = useNavigation();

  const handleFilteredData = (filtered) => {
    setFilteredData(filtered);
  };

  const renderTransaction = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('transactionDets')}>
      <View style={styles.transactionItem}>
        <View style={styles.transactionRow}>
          <View style={styles.transactionLeft}>
            <Text style={styles.nameText}>{item.name}</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>{item.role}</Text>
            </View>
          </View>
          <View style={styles.transactionRight}>
            <Text style={styles.amountText}>{item.amount}</Text>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    item.status === 'Initiated' ? '#E6F5EA' :
                    item.status === 'Paid' ? '#FFE8D6' :
                    item.status === 'Closed' ? '#E8ECEF' :
                    item.status === 'Settled' ? '#E8E9FE' :
                    '#FFE8E8', // In dispute
                },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  {
                    color:
                      item.status === 'Initiated' ? '#28A745' :
                      item.status === 'Paid' ? '#F28C38' :
                      item.status === 'Closed' ? '#6B7280' :
                      item.status === 'Settled' ? '#5A4FCF' :
                      '#DC2626', // In dispute
                  },
                ]}
              >
                {item.status}
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.descriptionText}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchComponent
        data={transactionData}
        onFilteredData={handleFilteredData}
        homeTabComponent={<HomeTab />}
        searchPlaceholder="Search transactions..."
        filters={['Initiated', 'Paid', 'Closed', 'Settled', 'In dispute']}
        dataType="transaction" // Add this prop for clarity
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.loadingContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SectionList
            sections={filteredData}
            renderItem={renderTransaction}
            renderSectionHeader={renderSectionHeader}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.sectionListContent}
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  loadingContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionListContent: {
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
    padding: 16,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 20,
  },
  transactionItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECEF',
  },
  transactionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1A1A1A',
    marginRight: 8,
  },
  roleBadge: {
    backgroundColor: '#E8ECEF',
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  roleText: {
    fontSize: 12,
    color: '#6B7280',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  statusBadge: {
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '300',
  },
  descriptionText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
});