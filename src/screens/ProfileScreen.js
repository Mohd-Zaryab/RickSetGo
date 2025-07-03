import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { db, auth } from '../firebase/config';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function BookRickshawScreen() {
  const [pickup, setPickup] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleBooking = async () => {
    if (!pickup) {
      alert('Please enter pickup location');
      return;
    }

    setLoading(true);
    try {
      const user = auth.currentUser;
      await addDoc(collection(db, 'bookings'), {
        userId: user.uid,
        pickup,
        bookingTime: Timestamp.fromDate(date),
        status: 'Pending',
        createdAt: Timestamp.now(),
      });
      alert('Rickshaw booked successfully!');
      navigation.navigate('BookingScheduleScreen');
    } catch (error) {
      console.log('Booking error:', error);
      alert('Failed to book rickshaw');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🛺 Book a Rickshaw</Text>

      <Text style={styles.label}>Pickup Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter pickup location"
        value={pickup}
        onChangeText={setPickup}
      />

      <Text style={styles.label}>Select Time</Text>
      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.pickerButton}>
        <Text style={styles.pickerText}>{date.toLocaleString()}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <TouchableOpacity style={styles.bookButton} onPress={handleBooking} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.bookText}>Book Now</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 28,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    padding: 14,
    marginBottom: 20,
    fontSize: 16,
  },
  pickerButton: {
    padding: 14,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    marginBottom: 20,
  },
  pickerText: {
    fontSize: 16,
    color: '#000',
  },
  bookButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  bookText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
