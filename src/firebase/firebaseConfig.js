// Firebase Configuration & Initialization
// Automatically detects environment variables or defaults to resilient offline mode

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForLocalModeKrishiMitra",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "krishimitra-ai.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "krishimitra-ai",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "krishimitra-ai.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456"
};

export const isFirebaseConfigured = () => {
  return Boolean(
    import.meta.env.VITE_FIREBASE_API_KEY &&
    import.meta.env.VITE_FIREBASE_PROJECT_ID
  );
};
