import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD1Je2AdqnC7cgCBI1c7H7RcGzzqRNnL14",
  authDomain: "ikshana-solutions.firebaseapp.com",
  projectId: "ikshana-solutions",
  storageBucket: "ikshana-solutions.firebasestorage.app",
  messagingSenderId: "59017644647",
  appId: "1:59017644647:web:487b189f54f2fee1c8e2c2"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
