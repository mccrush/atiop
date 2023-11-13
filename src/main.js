import './scss/styles.scss'
import { Dropdown } from 'bootstrap'

import { createApp } from 'vue'
import App from './App.vue'
//import './registerServiceWorker'
import store from './store'

import fireApp from './firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth"
const auth = getAuth(fireApp)

let app

//import { dataModels } from './data/dataModels'

onAuthStateChanged(auth, (user) => {
  if (!app) {
    app = createApp(App).use(store).mount('#app')
  }

  if (user) {
    console.log('main.js : Пользователь авторизован')
    store.commit('setCurrentUserId', user.uid)
  } else {
    console.log('main.js: Пользователь не авторизован. user = ', user)
    store.commit('setCurrentUserId', '')
  }
  /*
    store.dispatch('getItemsRT', { type: 'order' })
    dataModels.forEach(element => {
      if (element.type !== 'order') {
        store.dispatch('getItems', { type: element.type })
      }
    })
  */
})
