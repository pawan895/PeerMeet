// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBOhqnld81oOycClj1ru179ThQJH_Swqk",
  authDomain: "video-chat-a592f.firebaseapp.com",
  projectId: "video-chat-a592f",
  storageBucket: "video-chat-a592f.appspot.com",
  messagingSenderId: "590205969014",
  appId: "1:590205969014:web:c8a5df1cbaab0c30bcb557",
  measurementId: "G-HYDPG0ZD7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getDatabase();

export {auth,provider,db};