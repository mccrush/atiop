// import Vue from 'vue'
// import Vuex from 'vuex'

import { createStore } from 'vuex'
import data from './modules/data'
import user from './modules/user'
import message from './modules/message'

//Vue.use(Vuex)

export default createStore({
  modules: {
    data,
    user,
    message
  }
})
