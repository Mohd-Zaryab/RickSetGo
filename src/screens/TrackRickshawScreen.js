import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function TrackRickshawScreen() {
  const [region, setRegion] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [driverLocation, setDriverLocation] = useState({
    latitude: 26.4600,  // dummy location near Kanpur
    longitude: 80.3500,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Please enable location permission.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      };
      setUserLocation(location.coords);
      setRegion(coords);
    })();
  }, []);

  if (!region) {
    return (
      <View style={styles.center}>
        <Text>📍 Loading map...</Text>
      </View>
    );
  }

  return (
    <MapView style={styles.map} region={region} showsUserLocation>
      {/* Dummy Driver Location */}
      <Marker
        coordinate={driverLocation}
        title="Your Rickshaw"
        description="En route"
        pinColor="green"
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
