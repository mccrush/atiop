import './scss/styles.scss'
import 'bs-dark-theme'
//import './scss/custom.scss'

import { Offcanvas, Dropdown } from 'bootstrap'

import { createApp } from 'vue'
import App from './App.vue'
//import './registerServiceWorker'
import store from './store'

import fireApp from './firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth"
const auth = getAuth(fireApp)

let app

onAuthStateChanged(auth, (user) => {
  if (!app) {
    app = createApp(App).use(store).mount('#app')
  }

  if (user) {
    console.log('main.js : Пользователь авторизован')
    store.commit('setCurrentUserId', user.uid)
    store.commit('setCurrentUserEmail', user.email)

    store.dispatch('getAllItemsRT', { currentUserId: user.uid, appMode: store.getters.appMode })
  } else {
    console.log('main.js: Пользователь не авторизован. user = ', user)
    store.commit('setCurrentUserId', '')
  }
})
