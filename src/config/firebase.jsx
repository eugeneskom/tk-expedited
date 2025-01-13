// src/config/firebase.jsx
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAkAfJf2rvH_YDVlLVpXk1KdaaWLU_qwoM",
  authDomain: "remberg-logisticsllc.firebaseapp.com",
  projectId: "remberg-logisticsllc",
  storageBucket: "remberg-logisticsllc.appspot.com",
  messagingSenderId: "641133657029",
  appId: "1:641133657029:web:f1c3211f3a20edac9c29ac",
  measurementId: "G-EV4S4V9TZY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);