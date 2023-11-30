import getLoginMessage from './../../data/dataLoginMessage'

export default {
  state: {
    loginMessage: { text: '', type: '' }
  },
  mutations: {
    addMessage(state, code) {
      console.log('commit addMessage, code = ', code);
      state.loginMessage = getLoginMessage(code)
    }
  },
  getters: {
    loginMessage: state => state.loginMessage
  }
}