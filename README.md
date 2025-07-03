# RickSetGo

RickSetGo is a hyperlocal service booking app designed to connect users with local vendors for various services and deliveries. Built using React Native, Firebase, and Expo, this app aims to simplify service requests and deliveries in Tier 2 and Tier 3 cities.

---

## Features

- Phone number OTP authentication with Firebase
- Vendor registration and approval system
- Real-time location tracking and map integration
- Service booking with instant notifications
- User profile management
- Responsive and polished UI with animations

---

## Project Structure

- `src/` - Main source code folder
  - `screens/` - React Native screens/components
  - `firebase/` - Firebase configuration and initialization
- `assets/` - Images and icons used in the app
- `app.json` - Expo project configuration
- `.env` - Environment variables (API keys, etc.) (not committed to Git)
- `.gitignore` - Files and folders ignored by Git

---

## Setup Instructions

1. Clone the repository to your local machine.

2. Create a `.env` file in the root directory and add your Firebase API keys:

    ```
    FIREBASE_API_KEY=your_api_key_here
    FIREBASE_AUTH_DOMAIN=your_auth_domain_here
    FIREBASE_PROJECT_ID=your_project_id_here
    FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
    FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
    FIREBASE_APP_ID=your_app_id_here
    ```

3. Install dependencies:

    ```
    npm install
    ```

4. Run the app (Expo):

    ```
    expo start
    ```

---

## Firebase Configuration

The Firebase config is stored securely using environment variables in the `.env` file, which is included in `.gitignore` to avoid leaking sensitive keys.

---

## Notes

- Make sure you have the correct Firebase project setup with Authentication and Firestore enabled.
- For production builds, use `eas build` with appropriate profiles.
- The app uses `expo-firebase-recaptcha` for phone authentication (note: deprecated in SDK 48+; migrate if needed).
- Update your Android app package ID in `app.json` before building.

---

## Contact

Developed by Mohd Zaryab  
Email: your.email@example.com  
Phone: +91 9889544077  

---

## License

This project is licensed under the MIT License.

---

