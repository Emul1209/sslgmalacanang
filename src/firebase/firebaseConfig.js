import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Hardcoding the keys directly bypasses the Vite environment file glitch completely
const firebaseConfig = {
    apiKey: "AIzaSyB5VNu9EsC9fpSqhNHz81lepaIexxAJNxA",
    authDomain: "g-complaint-system.firebaseapp.com",
    projectId: "g-complaint-system",
    storageBucket: "g-complaint-system.firebasestorage.app",
    messagingSenderId: "620105548161",
    appId: "1:620105548161:web:8ddf50f36ee53befd7e880"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;