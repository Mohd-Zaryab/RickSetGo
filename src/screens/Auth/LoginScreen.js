import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image
} from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { signInWithPhoneNumber } from 'firebase/auth';
import { auth, app } from '../../firebase/config'; // ✅ Correct Path

const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const recaptchaVerifier = useRef(null);

  const handleSendOTP = async () => {
    if (phone.length !== 10 || isNaN(phone)) {
      Alert.alert("Invalid", "Please enter a valid 10-digit phone number");
      return;
    }

    try {
      const confirmation = await signInWithPhoneNumber(
        auth,
        '+91' + phone,
        recaptchaVerifier.current
      );
      navigation.navigate('OtpVerificationScreen', { confirmation });
    } catch (error) {
      console.error("OTP Error:", error);
      Alert.alert("Error", "Something went wrong while sending OTP");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
      />
      <Image source={require('../../../assets/icon.png')} style={styles.logo} />
      <Text style={styles.title}>Welcome to RickSetGo 🛺</Text>
      <Text style={styles.subtitle}>Login with your mobile number</Text>

      <TextInput
        placeholder="Enter 10-digit phone number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        maxLength={10}
      />

      <TouchableOpacity onPress={handleSendOTP} style={styles.button}>
        <Text style={styles.buttonText}>Send OTP</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'contain'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1c1c1e',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
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
