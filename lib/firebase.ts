import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD2QJfyfSFO0BT5-FYL8U4nvLaui0GEjwk",
  authDomain: "cosmetica-c2be9.firebaseapp.com",
  projectId: "cosmetica-c2be9",
  storageBucket: "cosmetica-c2be9.firebasestorage.app",
  messagingSenderId: "830141753196",
  appId: "1:830141753196:web:5d47ddd77368ab07a23549",
  measurementId: "G-K7GVGLQETQ",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
