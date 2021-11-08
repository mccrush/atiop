
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
    settingsArr: state => state.settings,
    settingsObj: state => {
      let newObject = {}
      state.settings.forEach(elem => {
        newObject[elem.alias] = elem.value
      })
      return newObject
    }
  }
}
