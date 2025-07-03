// src/screens/CompleteProfileScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { auth, db } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';

export default function CompleteProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [emergency, setEmergency] = useState('');

  const handleSubmit = async () => {
    const user = auth.currentUser;

    if (!name || !address || !email || !emergency) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      await setDoc(doc(db, 'users', user.uid), {
        name,
        address,
        email,
        emergency,
        phone: user.phoneNumber,
        uid: user.uid,
        createdAt: new Date(),
      });
      navigation.replace('HomeScreen');
    } catch (error) {
      console.log('Error saving user data:', error);
      Alert.alert('Error', 'Failed to save data');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Text style={styles.title}>Complete Your Profile</Text>

      <TextInput
        placeholder="Full Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Address"
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Emergency Contact Number"
        style={styles.input}
        value={emergency}
        onChangeText={setEmergency}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit & Continue</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#000',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
