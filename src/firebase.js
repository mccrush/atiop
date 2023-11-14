import { initializeApp } from 'firebase/app'
import apiKey from './../apiKey'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey,
  authDomain: "atiop-8c255.firebaseapp.com",
  databaseURL: "https://atiop-8c255.firebaseio.com",
  projectId: "atiop-8c255",
  storageBucket: "atiop-8c255.appspot.com",
  messagingSenderId: "880500583039",
  appId: "1:880500583039:web:c0439e9a7b8c970f",
  measurementId: "G-3L9681ZJ5C"
};

// Initialize Firebase
const fireApp = initializeApp(firebaseConfig)

export default fireApp