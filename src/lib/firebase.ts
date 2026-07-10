import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: "gen-lang-client-0341302172",
  appId: "1:736520858762:web:e5ea11a59e4d6e4ac4d173",
  apiKey: "AIzaSyAYDFJB6dMVoir2bgkUFAkaqK6bUx4vvMs",
  authDomain: "gen-lang-client-0341302172.firebaseapp.com",
  storageBucket: "gen-lang-client-0341302172.firebasestorage.app",
  messagingSenderId: "736520858762",
  measurementId: ""
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, "ai-studio-growpilotbyclari-a7c6bed9-70e0-4c80-85ed-2c51a0557db4");
export const auth = getAuth(app);
