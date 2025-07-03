import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const AppNameSplash = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('LoginScreen'); // ✅ Go to login after 3s
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.appName, { opacity: fadeAnim }]}>
        RickSetGo 🛺
      </Animated.Text>
    </View>
  );
};

export default AppNameSplash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  appName: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 3,
    textShadowColor: '#fff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10
  }
});
