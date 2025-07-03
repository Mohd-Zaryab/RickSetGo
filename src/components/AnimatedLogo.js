import React, { useEffect, useRef } from 'react';
import { Animated, Easing, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AnimatedLogo = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.logoContainer}>
      <Animated.View style={{ transform: [{ rotate: rotation }] }}>
        <Ionicons name="radio-button-on" size={40} color="#fff" />
      </Animated.View>
      <Text style={styles.logoText}>
        <Text style={styles.rick}>Rick</Text>
        <Text style={styles.set}>Set</Text>
        <Text style={styles.go}>Go</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 12,
  },
  rick: {
    color: '#ff3333',
  },
  set: {
    color: '#ffa500',
  },
  go: {
    color: '#00cc66',
  },
});

export default AnimatedLogo;
