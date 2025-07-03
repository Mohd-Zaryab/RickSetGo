// src/firebase/config.js

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCXa00l7mpBYlr3Lt-wQxr7nM0KPKjhRvo",
  authDomain: "urbansetgo-1d95c.firebaseapp.com",
  projectId: "urbansetgo-1d95c",
  storageBucket: "urbansetgo-1d95c.appspot.com",
  messagingSenderId: "197692278958",
  appId: "1:197692278958:web:7eb102671b6f2d4b4a053f"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
