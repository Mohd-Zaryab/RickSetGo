import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { db, auth } from '../firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const RegisterAgentScreen = () => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const phone = auth.currentUser?.phoneNumber || '';
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !city) {
      Alert.alert('❗ Fill all fields');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'agents'), {
        name,
        city,
        phone,
        approved: false,
        createdAt: Timestamp.now(),
      });
      Alert.alert('✅ Submitted', 'Request sent to admin for approval.');
      setName('');
      setCity('');
    } catch (error) {
      console.error('Error submitting agent:', error);
      Alert.alert('❌ Failed to submit. Try again.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register as Agent</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />

      <TextInput
        style={[styles.input, { backgroundColor: '#eaeaea' }]}
        placeholder="Phone Number"
        value={phone}
        editable={false}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Submitting...' : 'Submit for Approval'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 14,
    marginBottom: 16,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#000',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
});

export default RegisterAgentScreen;
