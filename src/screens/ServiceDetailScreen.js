import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const ServiceDetailScreen = ({ route }) => {
  const { service } = route.params || {};
  const navigation = useNavigation();
  const isDark = useColorScheme() === 'dark';

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#111' : '#fff' }]}> 
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={isDark ? '#fff' : '#000'} />
      </TouchableOpacity>

      <Image
        source={service?.image || require('../../assets/icon.png')} // fallback image
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={[styles.title, { color: isDark ? '#fff' : '#111' }]}>{service?.title || 'Service Name'}</Text>
      <Text style={[styles.description, { color: isDark ? '#ccc' : '#444' }]}> 
        {service?.description || 'No description provided for this service. Please try again later.'}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('BookingScreen', { service })}
      >
        <Text style={styles.buttonText}>Book Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ServiceDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 220,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 2,
    backgroundColor: 'rgba(255,255,255,0.6)',
    padding: 6,
    borderRadius: 30
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 20,
    marginHorizontal: 20
  },
  description: {
    fontSize: 16,
    marginHorizontal: 20,
    marginTop: 10,
    lineHeight: 22
  },
  button: {
    backgroundColor: '#000',
    margin: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16
  }
});
