import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'
import { auth } from './firebase'

let app

auth.onAuthStateChanged((user) => {
  if (!app) {
    app = createApp(App).use(store).mount('#app')
  }
  if (user) {
    store.commit('setUserId', user.uid)
    store.dispatch('getItems')
  } else {
    store.commit('setUserId', '')
    console.log('main.js: user not signed: ', user)
  }
})
