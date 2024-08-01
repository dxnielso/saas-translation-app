import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFLssYLNqdzGKi8It-sY5ts-nktWGul3c",
  authDomain: "saas-translator-app-d8ee1.firebaseapp.com",
  projectId: "saas-translator-app-d8ee1",
  storageBucket: "saas-translator-app-d8ee1.appspot.com",
  messagingSenderId: "707306482827",
  appId: "1:707306482827:web:36f6ba1a788be66831788e",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { auth, db, functions };
