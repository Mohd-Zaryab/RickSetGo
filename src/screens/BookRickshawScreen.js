import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
// ✅ CORRECT – matches your actual file name and path
import { auth, db } from '../firebase/config';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function BookRickshawScreen() {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const confirmBooking = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Error', 'User not logged in.');
      return;
    }

    try {
      await addDoc(collection(db, 'bookings'), {
        userId: user.uid,
        phone: user.phoneNumber,
        bookingTime: Timestamp.fromDate(date),
        status: 'Pending',
        createdAt: Timestamp.now(),
      });

      Alert.alert('Success', 'Your Rickshaw has been booked!');
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Booking failed:', error);
      Alert.alert('Error', 'Failed to book rickshaw. Try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📅 Book a Rickshaw</Text>

      <TouchableOpacity style={styles.pickerButton} onPress={() => showMode('date')}>
        <Ionicons name="calendar" size={20} color="#fff" />
        <Text style={styles.pickerText}>Select Date</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.pickerButton} onPress={() => showMode('time')}>
        <Ionicons name="time" size={20} color="#fff" />
        <Text style={styles.pickerText}>Select Time</Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

      <Text style={styles.selectedText}>
        📍 Selected: {date.toLocaleDateString()} at {date.toLocaleTimeString()}
      </Text>

      <TouchableOpacity style={styles.bookButton} onPress={confirmBooking}>
        <Text style={styles.bookText}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 10,
  },
  pickerText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  selectedText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  bookButton: {
    backgroundColor: '#28a745',
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 10,
  },
  bookText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
