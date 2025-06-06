import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
  } from 'react-native';
  import React from 'react';
  import Text from '../../../assecories/TextFont';
  import { category } from '../../../Dummy Data/data';
  import { useNavigation } from '@react-navigation/native';
import AnimatedCategoryItem from '../animation/AnimatedCategoryItem';
  
  const Categories = () => {
    const navigation = useNavigation();
  
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingContainer}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.contentContainer}>
                {/* <Text style={styles.titleText}>Categories</Text> */}
                <Text style={styles.descriptionText}>
                  We've curated a selection that caters to your every need
                </Text>
              </View>
  
              <View style={styles.grid}>
                {category.map((item, index) => (
                  <AnimatedCategoryItem
                    key={item.id}
                    item={item}
                    index={index}
                    onPress={() => navigation.navigate("subCategories")}
                    style={styles.category}
                  />
                ))}
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  export default Categories;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    keyboardAvoidingContainer: {
      flex: 1,
    },
    scrollContainer: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingTop: '2%',
    },
    contentContainer: {
      alignItems: 'center',
    },
    titleText: {
      fontSize: 24,
      fontWeight: '600',
      marginBottom: 8,
      color: '#000',
      alignSelf: 'flex-start',
    },
    descriptionText: {
      fontSize: 12,
      textAlign: 'left',
      color: '#475367',
      paddingBottom: 30,
      alignSelf: 'flex-start',
      paddingLeft: 14
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 10,
      justifyContent: 'space-between',
      gap: 10,
    },
    category: {
      width: '48%', // Adjust for two items per row with spacing
      marginBottom: 10,
    },
  });