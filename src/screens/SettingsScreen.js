import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <MaterialIcons name="settings" size={60} color="#000" />
      <Text style={styles.title}>Settings & Info</Text>
      <Text style={styles.text}>🔧 Report Bug: bugs@ricksetgo.com</Text>
      <Text style={styles.text}>🔐 Privacy Policy: Available soon</Text>
      <Text style={styles.text}>🌐 Language: Hindi / English</Text>
      <Text style={styles.text}>📝 Feedback: feedback@ricksetgo.com</Text>
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
