import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const AnimatedLaunch = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true
      })
    ]).start();

    const timeout = setTimeout(() => {
      navigation.replace('AppNameSplash'); // ✅ Updated screen name
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-15deg', '15deg']
  });

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.emoji, { transform: [{ rotate: rotateInterpolate }] }]}>
        👋
      </Animated.Text>
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        Welcome to RickSetGo
      </Animated.Text>
    </View>
  );
};

export default AnimatedLaunch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  emoji: {
    fontSize: 64,
    marginBottom: 20
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold'
  }
});
