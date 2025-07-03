// src/navigation/AppNavigator.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Agent Registration
import RegisterAgentScreen from '../screens/RegisterAgentScreen';

// Splash & Auth Screens
import AnimatedLaunch from '../screens/AnimatedLaunch';
import AppNameSplash from '../screens/AppNameSplash';
import LoginScreen from '../screens/Auth/LoginScreen';
import OtpVerificationScreen from '../screens/Auth/OtpVerificationScreen';
import SplashScreenAfterLogin from '../screens/SplashScreenAfterLogin';

// Main App Screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BookRickshawScreen from '../screens/BookRickshawScreen';
import BookingScheduleScreen from '../screens/BookingScheduleScreen';
import TrackRickshawScreen from '../screens/TrackRickshawScreen';
import HelpScreen from '../screens/HelpScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AnimatedLaunch" screenOptions={{ headerShown: false }}>

        {/* Entry Animation Flow */}
        <Stack.Screen name="AnimatedLaunch" component={AnimatedLaunch} />
        <Stack.Screen name="AppNameSplash" component={AppNameSplash} />

        {/* Auth Flow */}
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="OtpVerificationScreen" component={OtpVerificationScreen} />
        <Stack.Screen name="SplashScreenAfterLogin" component={SplashScreenAfterLogin} />

        {/* Main App Screens */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="BookRickshawScreen" component={BookRickshawScreen} />
        <Stack.Screen name="BookingScheduleScreen" component={BookingScheduleScreen} />
        <Stack.Screen name="TrackRickshawScreen" component={TrackRickshawScreen} />
        <Stack.Screen name="HelpScreen" component={HelpScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />

        {/* Agent Registration */}
        <Stack.Screen name="RegisterAgentScreen" component={RegisterAgentScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
