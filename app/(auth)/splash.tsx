import React, { useEffect } from 'react';
import { StyleSheet, View, Image, Text, useColorScheme } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import { useWindowDimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

export default function SplashScreen() {
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme];
  const { width } = useWindowDimensions();
  
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  
  useEffect(() => {
    // Start animation after a short delay
    setTimeout(() => {
      opacity.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) });
      scale.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) });
    }, 300);
    
    // Navigate to login screen after animation
    const timer = setTimeout(() => {
      router.replace('/(auth)/login');
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });
  
  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
        <View style={styles.logoWrapper}>
          <Text style={styles.logoText}>SP</Text>
        </View>
        <Text style={styles.appName}>ServicePro</Text>
        <Text style={styles.tagline}>Manage your service business efficiently</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoWrapper: {
    width: 120,
    height: 120,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  logoText: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 48,
    color: '#3366FF',
  },
  appName: {
    fontFamily: 'Inter-ExtraBold',
    fontSize: 32,
    color: '#ffffff',
    marginBottom: 16,
  },
  tagline: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
});