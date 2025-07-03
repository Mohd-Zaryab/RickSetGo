import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HelpScreen() {
  return (
    <View style={styles.container}>
      <Ionicons name="help-circle-outline" size={60} color="#000" />
      <Text style={styles.title}>Need Help?</Text>
      <Text style={styles.text}>📞 Call us: +91-9889544077</Text>
      <Text style={styles.text}>📧 Email: support@ricksetgo.com</Text>
      <Text style={styles.text}>⏱️ Response Time: Within 24 hrs</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  text: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
  },
});
