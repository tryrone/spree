import { Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState } from 'react'
import Button from '../../../../assecories/Button';
import AnimatedInput from '../../../../assecories/AnimatedInput';
import Entypo from '@expo/vector-icons/Entypo';
import BankModal from '../../../../assecories/modals/BankModal';
import Text from '../../../../assecories/TextFont';

const Verif2 = ({navigation}) => {
    const [bvnNo, setBvnNo] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [selectedBank, setSelectedBank] = useState({ id: '1', name: 'A&M thrift store', code: '044' });
    const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.loadingContainer}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                    <Text style={styles.titleText}>KYC Verification</Text>
                    <Text style={styles.descriptionText}>
                        Kindly ensure that the provided account is registered with your BVN
                    </Text>          

                    <View style={styles.inputs}>
                        <View>
                            <Text style={{ color: "#98A2B3", fontSize:16 }}>BVN No.</Text>
                            <AnimatedInput
                                placeholder=""
                                value={bvnNo}
                                onChangeText={setBvnNo}
                            />
                        </View>

                        <View>
                            <Text style={{ color: "#98A2B3", fontSize:16 }}>Account number</Text>
                            <AnimatedInput
                                placeholder=""
                                value={accountNumber}
                                onChangeText={setAccountNumber}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={{ 
                                backgroundColor: "#EBE9FE", 
                                fontSize:16, 
                                padding: 15,
                                borderRadius: 8
                            }}>Select Bank</Text>
                            <TouchableOpacity 
                                style={styles.dropdownButton}
                                onPress={() => setModalVisible(true)}
                            >
                                <Text style={styles.dropdownButtonText}>{selectedBank?.name || "Select bank"}</Text>
                                <Entypo name="chevron-right" size={20} color="#667185" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    </View>
                    <View style={{ marginTop: '70%' }}>
                    <Button
                      title="Submit"
                      onPress={() =>
                        navigation.navigate('successPage', {
                          desText: 'Your details have been submitted successfully.',
                          summary:
                            'We are currently verifying your details. You will be notified once the process is successfully completed.',
                        })
                      }
                    />
                    </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
        {/* Using the BankModal component */}
        <BankModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSelectBank={(bank) => setSelectedBank(bank)}
          selectedBank={selectedBank}
        />
    </>
  )
}

export default Verif2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      },
      loadingContainer: {
        flex: 1,
        paddingTop: '10%',
        paddingHorizontal: 20,
      },
      titleText: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 8,
        textAlign: 'left',
        color: '#000',
        marginLeft: "-48%"
      },
      descriptionText: {
        fontSize: 16,
        textAlign: 'left',
        color: '#667185',
        paddingBottom: 30,
      },
      inputs:{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginLeft: 40,
        gap: 30
      },
      dropdownButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 48,
        borderWidth: 1,
        borderColor: '#D0D5DD',
        borderRadius: 8,
        paddingHorizontal: 12,
        backgroundColor: '#FFFFFF',
        width: '110%',
      },
      inputGroup: {
        marginTop: "-7%"
      },
      dropdownButtonText: {
        fontSize: 16,
        color: '#344054',
      },
})