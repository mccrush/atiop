
//import { auth } from '@/firebase.js'
//import { db } from '@/firebase.js'
import settingsData from '@/data/settings'

export default {
  state: {
    settings: JSON.parse(localStorage.getItem('at-settings')) || settingsData,
    filterType: localStorage.getItem('at-filterType') || '',
    filterValue: localStorage.getItem('at-filterValue') || ''
  },
  mutations: {
    setNewSettingsValue(state, { name, value }) {
      state.settings[name] = value
      localStorage.setItem('at-settings', JSON.stringify(state.settings))
    },
    updateSettings(state, { showArhived, showEmpty, showPosition, showDate, showDeadline, showNaprav, showProject, showPrice, showTime, sortBy, sortUp }) {
      state.settings = { showArhived, showEmpty, showPosition, showDate, showDeadline, showNaprav, showProject, showPrice, showTime, sortBy, sortUp }
      localStorage.setItem('at-settings', JSON.stringify(state.settings))
    },
    updateSettingsShow(state, { name }) {
      const maps = {
        showArhived: 'showArhived',
        napravId: 'showNaprav',
        projectId: 'showProject',
        date: 'showDate',
        deadline: 'showDeadline',
        price: 'showPrice',
        time: 'showTime'
      }

      state.settings = { ...state.settings, [maps[name]]: true }
      localStorage.setItem('at-settings', JSON.stringify(state.settings))
    },
  },
  getters: {
    settings: state => state.settings,
  }
}
