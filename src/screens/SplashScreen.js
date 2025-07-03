import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.welcomeText}>Welcome to RickSetGo!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MapScreen')}
      >
        <Text style={styles.buttonText}>Find Nearby Rickshaws</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.profileButton]}
        onPress={() => navigation.navigate('ProfileScreen')}
      >
        <Text style={styles.buttonText}>Your Profile</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 50,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 12,
    width: '100%',
    marginBottom: 20,
    elevation: 4,
    alignItems: 'center',
  },
  profileButton: {
    backgroundColor: '#357ABD',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});
