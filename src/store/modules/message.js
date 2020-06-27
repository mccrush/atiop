export default {
  state: {
    message: { text: '', type: '' }
  },
  mutations: {
    addMessage(state, message) {
      state.message = message
    }
  },
  getters: {
    getMessage: state => state.message
  }
}