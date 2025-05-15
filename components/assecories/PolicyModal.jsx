import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Modal,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import Button from './Button';

const PolicyModal = ({ visible, policyType, onClose }) => {
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: Dimensions.get('window').height,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease),
      }).start();
    }
  }, [visible, slideAnim]);

  const getTitle = () => {
    return policyType === 'privacy' ? 'Privacy Policy' : 'Terms of Use';
  };

  const getContent = () => {
    if (policyType === 'privacy') {
      return (
        <Text style={styles.policyText}>
          <Text style={styles.policyHeading}>1. Information We Collect{'\n'}</Text>
          We collect information that you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This information may include: name, email, phone number, postal address, profile picture, payment method, items requested (for delivery services), and other information you choose to provide.{'\n\n'}
          
          <Text style={styles.policyHeading}>2. How We Use Your Information{'\n'}</Text>
          We use the information we collect to provide, personalize, maintain the safety and security of, and improve our products and services.{'\n\n'}
          
          <Text style={styles.policyHeading}>3. Sharing of Information{'\n'}</Text>
          We may share the information we collect with: other users as needed for services, third-party vendors and service providers, and as required by law.{'\n\n'}
          
          <Text style={styles.policyHeading}>4. Your Choices{'\n'}</Text>
          You may update your account information or email preferences at any time by logging into your account. You may also unsubscribe from marketing communications.{'\n\n'}
          
          <Text style={styles.policyHeading}>5. Changes to This Policy{'\n'}</Text>
          We may change this Privacy Policy from time to time. If we make significant changes, we will notify you through the app or by other means.
        </Text>
      );
    } else {
      return (
        <Text style={styles.policyText}>
          <Text style={styles.policyHeading}>1. Acceptance of Terms{'\n'}</Text>
          By accessing or using Spree, you agree to be bound by these Terms of Use and all applicable laws and regulations.{'\n\n'}
          
          <Text style={styles.policyHeading}>2. User Accounts{'\n'}</Text>
          You must create an account to use certain features of our service. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.{'\n\n'}
          
          <Text style={styles.policyHeading}>3. Prohibited Activities{'\n'}</Text>
          You agree not to engage in any illegal or unauthorized use of the service, including but not limited to: violating laws, distributing malware, collecting user information without consent, or interfering with the service.{'\n\n'}
          
          <Text style={styles.policyHeading}>4. Intellectual Property Rights{'\n'}</Text>
          The service and its contents are owned by Spree and are protected by copyright, trademark, and other laws. You may not use, copy, or distribute any content from the service without permission.{'\n\n'}
          
          <Text style={styles.policyHeading}>5. Termination{'\n'}</Text>
          We may terminate or suspend your account at any time, with or without cause and without prior notice.{'\n\n'}
          
          <Text style={styles.policyHeading}>6. Changes to Terms{'\n'}</Text>
          We reserve the right to modify these Terms of Use at any time. Your continued use of the service after any such changes constitutes your acceptance of the new Terms of Use.
        </Text>
      );
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{getTitle()}</Text>
            <View style={styles.modalDragHandle} />
          </View>

          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={true}>
            {getContent()}
          </ScrollView>

          <View style={styles.modalFooter}>
            <Button title="I Understand & Continue" onPress={onClose} />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  modalHeader: {
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E7EC',
  },
  modalDragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#E4E7EC',
    borderRadius: 3,
    position: 'absolute',
    top: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#101828',
    marginTop: 10,
  },
  modalContent: {
    padding: 20,
    flex: 1,
  },
  modalFooter: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    borderTopWidth: 1,
    borderTopColor: '#E4E7EC',
  },
  policyHeading: {
    fontWeight: '600',
    fontSize: 16,
    color: '#101828',
  },
  policyText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#344054',
  },
});

export default PolicyModal;