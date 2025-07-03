import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

const SplashScreenAfterLogin = ({ navigation }) => {
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('HomeScreen'); // ✅ Navigate after splash
    }, 3500);

    return () => clearTimeout(timer);
  }, [scaleAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/icon.png')} // ✅ Ensure this file exists
        style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreenAfterLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});
