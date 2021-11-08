
import dataSettings from '@/data/dataSettings'

export default {
  state: {
    settings: JSON.parse(localStorage.getItem('at-settings')) || dataSettings
  },
  mutations: {
    updateValue(state, { index }) {
      state.settings[index].value = !state.settings[index].value
      localStorage.setItem('at-settings', JSON.stringify(state.settings))
    }
  },
  getters: {
    settings: state => state.settings,
  }
}
