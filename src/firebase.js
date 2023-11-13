import { initializeApp } from 'firebase/app'
import apiKey from './../apiKey'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey,
  authDomain: "skcrm-8585.firebaseapp.com",
  projectId: "skcrm-8585",
  storageBucket: "skcrm-8585.appspot.com",
  messagingSenderId: "1097944941935",
  databaseURL: "https://skcrm-8585-default-rtdb.europe-west1.firebasedatabase.app",
  appId: "1:1097944941935:web:323680d4d085a5fe04149a"
};

// Initialize Firebase
const fireApp = initializeApp(firebaseConfig)

export default fireApp