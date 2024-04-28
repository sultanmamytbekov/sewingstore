import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKmsR6BvQy-jZTCTZ-7D4_VKWD9_dMzGY",
  authDomain: "seamstress-13521.firebaseapp.com",
  projectId: "seamstress-13521",
  storageBucket: "seamstress-13521.appspot.com",
  messagingSenderId: "941874697872",
  appId: "1:941874697872:web:2df07fa5e26a04a7bd6a15"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);