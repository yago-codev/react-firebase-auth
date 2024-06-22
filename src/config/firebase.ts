import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAkj2k7sAciKdiLTVzX7uQa5g3ZxXnQh0A",
  authDomain: "auth-boilerplate-a7ff3.firebaseapp.com",
  projectId: "auth-boilerplate-a7ff3",
  storageBucket: "auth-boilerplate-a7ff3.appspot.com",
  messagingSenderId: "93184563759",
  appId: "1:93184563759:web:529c0486f7bd9d606544da"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
