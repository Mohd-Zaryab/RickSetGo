import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { db, auth } from '../firebase/config'; // ✅ fixed import path
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';

export default function BookingScheduleScreen() {
  const [bookings, setBookings] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const q = query(
          collection(db, 'bookings'),
          where('userId', '==', user.uid),
          orderBy('bookingTime', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const userBookings = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookings(userBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, []);

  const renderItem = ({ item }) => {
    const date = item.bookingTime.toDate().toLocaleDateString();
    const time = item.bookingTime.toDate().toLocaleTimeString();

    return (
      <View style={styles.card}>
        <Text style={styles.date}>{date} at {time}</Text>
        <Text style={styles.status}>Status: {item.status}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🗓️ Your Bookings</Text>

      {bookings.length === 0 ? (
        <Text style={styles.noData}>No bookings found.</Text>
      ) : (
        <FlatList
          data={bookings}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  noData: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    marginBottom: 14,
    borderRadius: 12,
  },
  date: {
    fontSize: 16,
    fontWeight: '500',
  },
  status: {
    fontSize: 14,
    color: '#333',
    marginTop: 6,
  },
});
