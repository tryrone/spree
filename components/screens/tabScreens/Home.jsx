import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { pendingRequests, recentOrders, verificationItems } from '../../Dummy Data/data';

const Home = () => {
  const navigation = useNavigation();
  
  const VerificationCard = ({ title, subtitle, isCompleted, navigate }) => (
  <TouchableOpacity onPress={() => navigation.navigate(navigate)}>
    <View style={styles.verificationCard}>
      <View style={styles.verificationInfo}>
        <Text style={styles.verificationCardTitle}>{title}</Text>
        <Text style={styles.verificationCardSubtitle}>{subtitle}</Text>
      </View>
      <View style={isCompleted ? styles.checkCircle : styles.pendingCircle}>
        {isCompleted && <AntDesign name="check" size={20} color="#fff" />}
      </View>
    </View>
  </TouchableOpacity>
  );
  const PendingRequestCard = ({ name, role, amount, date, time, sentTo }) => (
    <View style={styles.requestCard}>
      <View style={styles.requestInfo}>
        <Text style={styles.requestName}>{name}</Text>
        <View style={styles.requestRole}>
          {sentTo ? (
            <Text style={styles.roleLabel}>Sent to</Text>
          ) : (
            <Text style={styles.roleLabel}>From</Text>
          )}
          <View style={[styles.roleBadge, 
            {backgroundColor: role === 'Buyer' ? '#F6FEFC' : '#FEFDF0'}]}>
            <Text style={[styles.roleText, 
              {color: role === 'Buyer' ? '#107569' : '#A15C07'}]}>{role}</Text>
          </View>
        </View>
      </View>
      <View style={styles.requestDetails}>
        <Text style={styles.requestDate}>{date} • {time}</Text>
        <Text style={styles.requestAmount}>₦{amount}</Text>
      </View>
    </View>
  );

  const OrderCard = ({ name, items, date, product }) => (
    <View style={styles.orderCard}>
      <Image 
        source={require('../../../assets/spree/james.png')} 
        style={styles.avatar}
        defaultSource={require('../../../assets/spree/james.png')}
      />
      <View style={styles.orderInfo}>
        <Text style={styles.orderTitle}>
          {name} ordered {items} {items > 1 ? 'items' : 'item'}
        </Text>
        <Text style={styles.orderDetails}>{date} • {product}</Text>
      </View>
    </View>
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.loadingContainer}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Header */}
                <View style={styles.header}>
                  <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                  <TouchableOpacity onPress={() => navigation.navigate('profile')}>
                      <Image
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 50,
                          marginRight: 10
                        }}
                        source={require('../../../assets/spree/james.png')}
                      />
                  </TouchableOpacity>
                  <View style={{display: "flex", flexDirection: "colum"}}>                  
                    <Text style={styles.headerTitle}>Hello James 👋</Text>
                    <Text style={styles.headerSubtitle}>Track your orders here</Text>
                  </View>
                  </View>
                  <TouchableOpacity style={styles.bellIconContainer}>
                    <Ionicons name="notifications-outline" size={24} color="#000" />
                  </TouchableOpacity>
                </View>

              {/* Escrow Card */}
              <View style={styles.escrowCard}>
                <View style={styles.dollarContainer}>
                  <FontAwesome name="dollar" size={18} color="#fff" />
                </View>
                <Text style={styles.escrowText}>
                  Make secure transactions with{'\n'}Spree's Escrow Service!
                </Text>
                <TouchableOpacity style={styles.escrowButton}>
                  <Text style={styles.escrowButtonText}>Initiate Escrow Payment</Text>
                </TouchableOpacity>
              </View>

              {/* Verification Section */}
              <View style={styles.verificationSection}>
                <Text style={styles.verificationTitle}>Complete your verification (1/6)</Text>
                
                {/* Mapping through verification items */}
                {verificationItems.map((item, index) => (
                  <VerificationCard
                    key={index}
                    title={item.title}
                    subtitle={item.subtitle}
                    isCompleted={item.isCompleted}
                    navigate={item.navigation}
                  />
                ))}
              </View>

              {/* Pending Requests Section */}
              <View style={styles.section}>
                <View style={styles.sectionCard}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Pending Requests</Text>
                  <TouchableOpacity>
                    <Text style={styles.viewAllText}>View all</Text>
                  </TouchableOpacity>
                </View>
                  {pendingRequests.map((request, index) => (
                    <React.Fragment key={index}>
                      <PendingRequestCard 
                        name={request.name}
                        role={request.role}
                        amount={request.amount}
                        date={request.date}
                        time={request.time}
                        sentTo={request.sentTo}
                      />
                      {index < pendingRequests.length - 1 && <View style={styles.divider} />}
                    </React.Fragment>
                  ))}
                </View>
              </View>

              {/* Recent Orders Section */}
              <View style={styles.section}>
                <View style={styles.sectionCard}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Orders</Text>
                    <TouchableOpacity>
                      <Text style={styles.viewAllText}>View all</Text>
                    </TouchableOpacity>
                  </View>
                  {recentOrders.map((order, index) => (
                    <React.Fragment key={index}>
                      <OrderCard 
                        name={order.name}
                        items={order.items}
                        date={order.date}
                        product={order.product}
                      />
                      {index < recentOrders.length - 1 && <View style={styles.divider} />}
                    </React.Fragment>
                  ))}
                </View>
              </View>

            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    paddingTop: '5%',
    paddingHorizontal: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  bellIconContainer: {
    padding: 8,
  },
  escrowCard: {
    backgroundColor: '#263238',
    borderRadius: 16,
    padding: 39,
    alignItems: 'center',
    marginBottom: 24,
  },
  dollarContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  escrowText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  escrowButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
    marginTop: 10,
  },
  escrowButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  // New styles for Pending Requests and Recent Orders
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  viewAllText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    textDecorationLine: "underline"
  },
  sectionCard: {
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
  requestCard: {
    // padding: 0,
    paddingVertical: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  requestInfo: {
    marginBottom: 4,
  },
  requestName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  requestRole: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  roleText: {
    fontSize: 14,
    fontWeight: '500',
  },
  requestDetails: {
    flexDirection: "column",
    justifyContent: 'space-between',
    alignItems: "flex-end",
    gap: 10
  },
  requestDate: {
    fontSize: 14,
    color: '#666',
  },
  requestAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
  },
  orderCard: {
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  orderDetails: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  // Verification section styles
  verificationSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  verificationTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  verificationCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#D0D5DDA3"
  },
  verificationInfo: {
    flex: 1,
  },
  verificationCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  verificationCardSubtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  checkCircle: {
    backgroundColor: '#2e8b57',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pendingCircle: {
    backgroundColor: '#ddd',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
})