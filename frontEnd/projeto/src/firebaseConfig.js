// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSICyCUvFpGLWueqh-fG_Q-hogLBPbsz6VkY84",
  authDomain: "nifty-might-382013.firebaseapp.com",
  projectId: "nifty-might-382013",
  storageBucket: "nifty-might-382013.appspot.com",
  messagingSenderId: "43746243643",
  appId: "1:43746243643:web:7f11f22a0989365a5ad81e",
  measurementId: "G-QYVLVCBEYB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;