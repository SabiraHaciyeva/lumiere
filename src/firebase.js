import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBjqCwaXb_qxvjdBmsqmtomtB5iqPe0T5Y",
  authDomain: "lumiere-3d55f.firebaseapp.com",
  projectId: "lumiere-3d55f",
  storageBucket: "lumiere-3d55f.firebasestorage.app",
  messagingSenderId: "154740713601",
  appId: "1:154740713601:web:13656efca412bffbd50580",
  measurementId: "G-E7HZ8Q2CFJ"
};

// Firebase-i başladırıq
const app = initializeApp(firebaseConfig);

// Authentication xidmətlərini ixrac edirik
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { signInWithPopup };