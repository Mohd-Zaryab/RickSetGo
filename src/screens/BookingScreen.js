import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { db, auth } from '../firebase/config';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

export default function BookingScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { service } = route.params;

  const [confirming, setConfirming] = useState(false);

  const handleConfirmBooking = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Error', 'User not logged in');
      return;
    }

    setConfirming(true);

    try {
      await addDoc(collection(db, 'bookings'), {
        userId: user.uid,
        serviceName: service.title,
        bookingTime: Timestamp.now(),
        status: 'Pending',
        createdAt: Timestamp.now(),
      });

      Alert.alert(
        'Booking Confirmed',
        `Your booking for ${service.title} is confirmed!`,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('BookingScheduleScreen'),
          },
        ]
      );
    } catch (error) {
      console.error('Booking error:', error);
      Alert.alert('Booking Failed', error.message);
    } finally {
      setConfirming(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Book: {service.title}</Text>

      <Text style={styles.infoText}>
        You are about to book the service instantly.
      </Text>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmBooking}
        disabled={confirming}
      >
        <Text style={styles.confirmButtonText}>
          {confirming ? 'Booking...' : 'Confirm Booking Now'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4A90E2',
    textAlign: 'center',
    marginBottom: 25,
  },
  infoText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 40,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});
