import { 
    StyleSheet, 
    View, 
    Modal, 
    TouchableOpacity, 
    TextInput, 
    FlatList
  } from 'react-native';
  import React, { useState, useEffect } from 'react';
  import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
  import Octicons from '@expo/vector-icons/Octicons';
  import { NIGERIAN_BANKS } from '../../Dummy Data/data';
import Text from '../TextFont';
  
  const BankModal = ({ 
    visible, 
    onClose, 
    onSelectBank, 
    selectedBank = null,
    banks = NIGERIAN_BANKS 
  }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBanks, setFilteredBanks] = useState(banks);
  
    useEffect(() => {
      if (searchQuery) {
        const filtered = banks.filter(bank => 
          bank.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredBanks(filtered);
      } else {
        setFilteredBanks(banks);
      }
    }, [searchQuery, banks]);
  
    const renderBankItem = ({ item }) => (
      <TouchableOpacity
        style={[
          styles.bankItem,
          selectedBank?.id === item.id && styles.selectedBankItem
        ]}
        onPress={() => {
          onSelectBank(item);
          onClose();
        }}
      >
        <Text style={styles.bankItemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Bank</Text>
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={onClose}
              >
                <FontAwesome6 name="x" size={24} color="#344054" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.searchContainer}>
              <Octicons name="search" size={20} color="#667185" style={styles.searchIcon}/>
              <TextInput
                style={styles.searchInput}
                placeholder="Search bank"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            
            <FlatList
              data={filteredBanks}
              renderItem={renderBankItem}
              keyExtractor={item => item.id}
              style={styles.banksList}
            />
          </View>
        </View>
      </Modal>
    );
  };
  
  export default BankModal;
  
  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: 'white',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      height: '70%',
      padding: 20,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#000',
    },
    closeButton: {
      padding: 4,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F9FAFB',
      borderRadius: 8,
      paddingHorizontal: 12,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: '#D0D5DD',
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      height: 44,
      fontSize: 16,
    },
    banksList: {
      flex: 1,
    },
    bankItem: {
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#F2F4F7',
    },
    selectedBankItem: {
      backgroundColor: '#F0EBFF',
    },
    bankItemText: {
      fontSize: 16,
      color: '#344054',
    },
  });