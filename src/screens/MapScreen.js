import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function BookingScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { service } = route.params;

  const [loading, setLoading] = useState(false);

  const handleConfirmBooking = () => {
    setLoading(true);

    // Simulate booking API call or Firebase save
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Booking Confirmed',
        `Your booking for ${service.title} is confirmed! Driver will contact you soon.`,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('HomeScreen'),
          },
        ]
      );
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Booking</Text>
      <Text style={styles.serviceName}>{service.title}</Text>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmBooking}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.confirmText}>Confirm Booking Now</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 22,
    marginBottom: 40,
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 10,
  },
  confirmText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
