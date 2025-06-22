import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import AntDesign from '@expo/vector-icons/AntDesign';

const Like = () => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const [isLiked, setIsLiked] = useState(false);

    const handleToggleLike = () => {
        const wasLiked = isLiked;
        
        setIsLiked(prev => !prev); // Toggle the liked state
    
        // Show appropriate toast notification
        if (wasLiked) {
          Toast.show({
            type: ALERT_TYPE.WARNING,
            title: 'Removed from Wishlist',
            textBody: 'Item removed from your wishlist',
          });
        } else {
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Added to Wishlist!',
            textBody: 'Item added to your wishlist',
          });
        }
    };

    const handlePress = (callback) => {
        // Add press animation
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 0.95,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
        ]).start();
    
        if (callback) callback();
    };

    return (
        <View>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <TouchableOpacity
                    style={styles.likeButton}
                    onPress={() => handlePress(handleToggleLike)}
                    activeOpacity={0.7}
                >
                    {isLiked ? (
                        <AntDesign name="heart" size={24} color="red" />
                    ) : (
                        <AntDesign name="hearto" size={24} color="#000" />
                    )}
                </TouchableOpacity>
            </Animated.View>
        </View>
    )
}

export default Like

const styles = StyleSheet.create({
    likeButton: {
        // position: 'absolute',
        // bottom: -10,
        // right: 16,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 7,
    },
})