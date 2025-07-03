import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RiderHome() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, Rider! 🛺</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF6EC',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#444'
  }
});
