import Vue from 'vue'
import Vuex from 'vuex'
import data from './modules/data'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    data,
    user
  }
})
