import { createStore } from 'vuex'
import item from './modules/item'
import data from './modules/data'
import user from './modules/user'
import message from './modules/message'

export default createStore({
  modules: {
    item,
    data,
    user,
    message
  }
})
