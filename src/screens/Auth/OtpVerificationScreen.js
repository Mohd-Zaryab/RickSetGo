import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth, db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

export default function OtpVerificationScreen({ route, navigation }) {
  const { verificationId } = route.params;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      const userCredential = await signInWithCredential(auth, credential);
      const user = userCredential.user;

      // Check if profile is completed
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        navigation.replace('HomeScreen');
      } else {
        navigation.replace('CompleteProfileScreen');
      }
    } catch (error) {
      Alert.alert('Verification Failed', 'Invalid OTP or network issue');
      console.log('OTP Error:', error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>
      <TextInput
        style={styles.otpInput}
        keyboardType="number-pad"
        maxLength={6}
        placeholder="123456"
        value={otp}
        onChangeText={setOtp}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleVerifyOtp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Verify OTP</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    fontSize: 20,
    padding: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#000',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
