import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase/config';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

const HomeScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();
  const [bookingCount, setBookingCount] = useState(0);
  const [isAgent, setIsAgent] = useState(null);

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        const qSnap = await getDocs(
          collection(db, 'bookings')
        );
        const userBookings = qSnap.docs.filter(
          doc => doc.data().userId === user.uid
        );
        setBookingCount(userBookings.length);
      } catch (error) {
        console.error('Error fetching booking history:', error);
      }
    };

    const checkAgent = async () => {
      try {
        const agentDoc = await getDoc(doc(db, 'agents', user.uid));
        if (agentDoc.exists() && agentDoc.data().approved) {
          setIsAgent(true);
        } else {
          setIsAgent(false);
        }
      } catch (err) {
        console.error('Agent check error:', err);
        setIsAgent(false);
      }
    };

    if (user) {
      fetchUserBookings();
      checkAgent();
    }
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.heading}>RickSetGo 🛺</Text>
      </View>

      {/* Profile Info */}
      <View style={styles.profileCard}>
        <Ionicons name="person-circle-outline" size={64} color="#000" />
        <Text style={styles.name}>👋 Welcome, {user.displayName || 'User'}</Text>
        <Text style={styles.info}>📞 {user.phoneNumber}</Text>
        <Text style={styles.info}>📧 {user.email || 'Not provided'}</Text>
        <Text style={styles.info}>🧾 Rides Taken: {bookingCount}</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsWrapper}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('BookRickshawScreen')}
        >
          <Ionicons name="car-outline" size={24} color="#fff" />
          <Text style={styles.actionText}>Book Rickshaw</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('BookingScheduleScreen')}
        >
          <Ionicons name="calendar-outline" size={24} color="#fff" />
          <Text style={styles.actionText}>Booking Schedule</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('TrackRickshawScreen')}
        >
          <Ionicons name="navigate-circle-outline" size={24} color="#fff" />
          <Text style={styles.actionText}>Track Rickshaw</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('HelpScreen')}
        >
          <Ionicons name="help-circle-outline" size={24} color="#fff" />
          <Text style={styles.actionText}>Help</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('SettingsScreen')}
        >
          <Ionicons name="settings-outline" size={24} color="#fff" />
          <Text style={styles.actionText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Register Agent Option */}
      {isAgent === false && (
        <TouchableOpacity
          style={styles.registerAgent}
          onPress={() => navigation.navigate('RegisterAgentScreen')}
        >
          <Text style={styles.registerText}>🚀 Register as a Vendor</Text>
        </TouchableOpacity>
      )}

      {isAgent === null && <ActivityIndicator color="black" style={{ marginTop: 20 }} />}

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Made with ❤️ by Mohammad Zaryab
        </Text>
        <Text style={styles.footerText}>Email: Zaryabansari98@gmail.com</Text>
        <Text style={styles.footerText}>RickSetGo 2025 ©</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#000',
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  heading: { fontSize: 26, fontWeight: 'bold', color: '#fff' },
  profileCard: {
    alignItems: 'center',
    marginVertical: 24,
    padding: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 16,
    marginHorizontal: 16,
  },
  name: { fontSize: 20, fontWeight: 'bold', marginTop: 8 },
  info: { fontSize: 14, color: '#555', marginTop: 4 },
  actionsWrapper: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: '#111',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '500',
  },
  registerAgent: {
    backgroundColor: '#007AFF',
    marginHorizontal: 16,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
  },
  registerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
});

export default HomeScreen;
