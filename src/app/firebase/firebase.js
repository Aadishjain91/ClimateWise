import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5wHs4UtuLvKBlMJBdZEHprFyyp2h9lvQ",
  authDomain: "climatewise-2f3a5.firebaseapp.com",
  projectId: "climatewise-2f3a5",
  storageBucket: "climatewise-2f3a5.appspot.com",
  messagingSenderId: "436634034446",
  appId: "1:436634034446:web:6f611f131b386120fa775f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GithubAuthProvider();
export const firestore = getFirestore(app);
