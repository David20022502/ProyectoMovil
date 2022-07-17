//import firebase from "firebase/app";
//import  "firebase/database";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeFirestore } from 'firebase/firestore';


//import 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyADBQbD8QDbkE25fO5ABDQKx8XoxMARX60",
    authDomain: "proyectomovil-af0fa.firebaseapp.com",
    projectId: "proyectomovil-af0fa",
    storageBucket: "proyectomovil-af0fa.appspot.com",
    messagingSenderId: "148984858864",
    appId: "1:148984858864:web:4f6d2a3a10720508565a35",
    measurementId: "G-PL5G3CTTN6"
};





const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});
initializeApp(firebaseConfig);

export const db_Firestore = db;





// Initialize Firebase
