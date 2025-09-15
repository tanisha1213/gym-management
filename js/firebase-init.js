// ✅ Using compat SDKs everywhere
const firebaseConfig = {
  apiKey: "AIzaSyDhyXmvvZ6lYYYM5x788SUV7vE4I8HTt0o",
  authDomain: "gym-management-system-62e7d.firebaseapp.com",
  projectId: "gym-management-system-62e7d",
  storageBucket: "gym-management-system-62e7d.appspot.com",
  messagingSenderId: "513936173325",
  appId: "1:513936173325:web:cfa7b59460755805a1a844"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
