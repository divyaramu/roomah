// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyALnekEH-zuFowk2f6mZcZqvSptL9w2ko4",
  authDomain: "roomah-f34c2.firebaseapp.com",
  projectId: "roomah-f34c2",
  storageBucket: "roomah-f34c2.appspot.com",
  messagingSenderId: "982339400590",
  appId: "1:982339400590:web:cfc898277757e6620eeadf",
  measurementId: "G-SGJMJGTP8N",
  databaseURL: "https://roomah-f34c2-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, app, storage, db, analytics };  