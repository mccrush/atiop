import { createStore } from 'vuex'
import item from './modules/item'
import settings from './modules/settings'
import user from './modules/user'
import message from './modules/message'
import admin from './modules/admin'

export default createStore({
  modules: {
    item,
    settings,
    user,
    message,
    admin
  }
})
