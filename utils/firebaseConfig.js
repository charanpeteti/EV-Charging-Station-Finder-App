import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyAJI4osFSfrBAncOGj6tMZxr4r3obJc3XA",

  authDomain: "ev-station-app-3d107.firebaseapp.com",

  projectId: "ev-station-app-3d107",

  storageBucket: "ev-station-app-3d107.firebasestorage.app",

  messagingSenderId: "640208093455",

  appId: "1:640208093455:web:509ada42b75f511a9efe7a",
};



// Initialize Firebase App

const app = initializeApp(firebaseConfig);



// Export Firebase Auth

const auth = getAuth(app);

const db = getFirestore(app);



export { app,auth,db };