import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { db, auth } from '../../firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const RegisterAgentScreen = () => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  
  const phone = auth.currentUser?.phoneNumber || '';

  const handleRegister = async () => {
    if (!name.trim() || !city.trim()) {
      Alert.alert('⚠️ Incomplete', 'Please fill in all the fields.');
      return;
    }

    if (!auth.currentUser) {
      Alert.alert('⚠️ Login Required', 'Please login to continue.');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'agents'), {
        name: name.trim(),
        city: city.trim(),
        phone,
        approved: false,
        createdAt: Timestamp.now(),
      });
      Alert.alert('✅ Request Sent', 'Your request has been submitted for approval.');
      setName('');
      setCity('');
    } catch (error) {
      console.error('Error submitting agent:', error);
      Alert.alert('❌ Submission Failed', 'Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
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

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Submitting...' : 'Submit for Approval'}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default RegisterAgentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#111',
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 14,
    marginBottom: 16,
    borderRadius: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#000',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
