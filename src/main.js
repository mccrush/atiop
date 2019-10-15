import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

let app = "";

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"; // DB

const firebaseConfig = {
  apiKey: "AIzaSyDVDmMu6JRvBYGGtPG4ZjOT3jp0JRprPL4",
  authDomain: "atiop-8c255.firebaseapp.com",
  databaseURL: "https://atiop-8c255.firebaseio.com",
  projectId: "atiop-8c255",
  storageBucket: "",
  messagingSenderId: "880500583039",
  appId: "1:880500583039:web:c0439e9a7b8c970f"
};
firebase.initializeApp(firebaseConfig);

export const fb = firebase.firestore; // Для прямого удаления из БД, используется в файле Store
export const db = firebase.firestore();
export const auth = firebase.auth();

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render(h) { return h(App); },
    }).$mount('#app');
  }
});
// Комментарий
