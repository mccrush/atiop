import getMessage from '@/scripts/getMessage'

export default {
  state: {
    message: { text: '', type: '' }
  },
  mutations: {
    addMessage(state, code) {
      state.message = getMessage(code)
    }
  },
  getters: {
    getMessage: state => state.message
  }
}