import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  Animated,
  Easing
} from 'react-native';

const MessageDetails = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "We understand your concern regarding the non-receipt of the purchased item, and we sincerely apologize for any inconvenience this may have caused. Your satisfaction is our top priority, and we are committed to resolving this matter promptly.",
      timestamp: "9:05PM",
      isUser: false,
      type: 'system'
    },
    {
      id: 2,
      text: "Kindly share any relevant details about the order, such as the tracking number or the seller profile link. This information will assist us in investigating the issue thoroughly.",
      timestamp: "9:05PM",
      isUser: false,
      type: 'system'
    },
    {
      id: 3,
      text: "Great news! Dispute has been resolved in your favour. Once the seller gets the item back, your money will be refunded.",
      timestamp: "9:05PM",
      isUser: false,
      type: 'success',
      sender: 'Spree'
    }
  ]);

  const scrollViewRef = useRef(null);
  const messageAnimations = useRef({});

  const disputeInfo = {
    caseId: '#1234567',
    transaction: 'Escrow Transaction with A&M Thrift',
    buyerName: 'Adeleke Mouteen',
    product: 'Apple vision pro',
    amount: '₦ 500,000'
  };

  // Initialize animation for new messages
  const initializeMessageAnimation = (messageId) => {
    if (!messageAnimations.current[messageId]) {
      messageAnimations.current[messageId] = {
        slideIn: new Animated.Value(50),
        fadeIn: new Animated.Value(0),
        scale: new Animated.Value(0.8)
      };
    }
  };

  // Animate message entrance
  const animateMessageIn = (messageId) => {
    const animations = messageAnimations.current[messageId];
    if (animations) {
      Animated.parallel([
        Animated.timing(animations.slideIn, {
          toValue: 0,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(animations.fadeIn, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(animations.scale, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        })
      ]).start();
    }
  };

  // Scroll to bottom smoothly
  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isUser: true,
        type: 'user'
      };
      
      // Initialize animation for new message
      initializeMessageAnimation(newMessage.id);
      
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      
      // Animate the new message and scroll to bottom
      setTimeout(() => {
        animateMessageIn(newMessage.id);
        scrollToBottom();
      }, 50);
      
      // Auto-reply simulation
      setTimeout(() => {
        const autoReply = {
          id: messages.length + 2,
          text: "Thank you for your message. We are reviewing your case and will respond shortly.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isUser: false,
          type: 'system'
        };
        
        // Initialize animation for auto-reply
        initializeMessageAnimation(autoReply.id);
        
        setMessages(prev => [...prev, autoReply]);
        
        // Animate auto-reply and scroll
        setTimeout(() => {
          animateMessageIn(autoReply.id);
          scrollToBottom();
        }, 100);
      }, 1500);
    }
  };

  // Initialize animations for existing messages on component mount
  useEffect(() => {
    messages.forEach(msg => {
      initializeMessageAnimation(msg.id);
      // Set initial values for existing messages (already visible)
      const animations = messageAnimations.current[msg.id];
      if (animations) {
        animations.slideIn.setValue(0);
        animations.fadeIn.setValue(1);
        animations.scale.setValue(1);
      }
    });
  }, []);

  const renderMessage = (msg) => {
    const animations = messageAnimations.current[msg.id];
    
    if (msg.type === 'success') {
      return (
        <View key={msg.id} style={styles.successContainer}>
          {/* Success message content commented out as in original */}
        </View>
      );
    }

    return (
      <Animated.View 
        key={msg.id}
        style={[
          {
            transform: [
              { 
                translateY: animations ? animations.slideIn : 0
              },
              {
                scale: animations ? animations.scale : 1
              }
            ],
            opacity: animations ? animations.fadeIn : 1
          }
        ]}
      >
        <View style={[
          styles.messageContainer,
          msg.isUser ? styles.userMessage : styles.systemMessage
        ]}>
          <Text style={[
            styles.messageText,
            msg.isUser ? styles.userMessageText : styles.systemMessageText
          ]}>
            {msg.text}
          </Text>
        </View>
        <Text style={[
          styles.userTimestamp, 
          msg.isUser ? styles.userTimestamp : styles.messageTimestamp
        ]}>
          {msg.timestamp}
        </Text>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Messages */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer} 
        showsVerticalScrollIndicator={false}
        onContentSizeChange={scrollToBottom}
      >
        
        <View style={styles.caseInfo}>
          <Text style={styles.caseTitle}>{disputeInfo.transaction}</Text>
          <View style={styles.caseDetails}>
            <View style={styles.case}>
              <Text style={styles.caseDetailText}>Buyer's name:</Text>
              <Text style={{color: "#27115F"}}>{disputeInfo.buyerName}</Text>
            </View>
            <View style={styles.case}>
              <Text style={styles.caseDetailText}>Product:</Text>
              <Text style={{color: "#27115F"}}>{disputeInfo.product}</Text>
            </View>
            <View style={styles.case}>
              <Text style={styles.caseDetailText}>Amount paid:</Text>
              <Text style={{color: "#27115F"}}>{disputeInfo.amount}</Text>
            </View>
          </View>
          <Text style={styles.caseId}>Case ID {disputeInfo.caseId}</Text>
        </View>

        {messages.map(renderMessage)}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TouchableOpacity style={styles.attachButton}>
            <Text style={styles.attachIcon}>📎</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="Type your complaint..."
            value={message}
            onChangeText={setMessage}
            multiline
          />
        </View>
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendIcon}>➤</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  activeStatus: {
    color: '#ff6b35',
  },
  caseInfo: {
    backgroundColor: '#e8e3ff',
    margin: 16,
    marginHorizontal: 60,
    padding: 16,
    borderRadius: 12,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  caseTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#27115F',
    marginBottom: 12,
  },
  caseDetails: {
    marginBottom: 12,
  },
  caseDetailText: {
    fontSize: 14,
    color: '#27115F',
    marginBottom: 4,
  },
  case: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 40,
    paddingVertical: 3
  },
  caseId: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    backgroundColor: "#FFFFFF4D",
    paddingVertical: 8,
    paddingHorizontal: 70
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  activeActionBtn: {
    backgroundColor: '#333',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  activeActionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  inactiveActionBtn: {
    backgroundColor: '#e9ecef',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  inactiveActionText: {
    color: '#666',
    fontSize: 14,
  },
  additionalActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  additionalActionBtn: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  additionalActionText: {
    color: '#666',
    fontSize: 14,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#6c5ce7',
    borderRadius: 12,
    padding: 12,
    borderBottomRightRadius: 0
  },
  systemMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e9ecef',
    borderRadius: 12,
    padding: 12,
    borderBottomLeftRadius: 0
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userMessageText: {
    color: 'white',
  },
  systemMessageText: {
    color: '#333',
  },
  messageTimestamp: {
    fontSize: 12,
    color: '#000',
    marginTop: -10,
    alignSelf: 'flex-start',
    marginBottom: 20
  },
  userTimestamp: {
    alignSelf: 'flex-end',
    fontSize: 12,
    marginTop: -5,
  },
  successContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  successBadge: {
    backgroundColor: '#6c5ce7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  successBadgeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  successMessage: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  successMessageText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 8,
  },
  senderName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    marginBottom: 12,
  },
  reactionButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  reactionBtn: {
    padding: 8,
  },
  reactionText: {
    fontSize: 20,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  inputContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: '#f8f9fa',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: "90%",
  },
  attachButton: {
    marginRight: 8,
  },
  attachIcon: {
    fontSize: 20,
    color: '#666',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    marginLeft: 8,
  },
  sendIcon: {
    fontSize: 25,
    color: '#6c5ce7',
  },
});

export default MessageDetails;