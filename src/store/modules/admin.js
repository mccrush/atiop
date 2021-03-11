
export default {
  state: {
  },
  mutations: {
  },
  actions: {
    // Добавление нового свойста задаче
    // Возможно, лучше использовать как инструмент администратора
    async addNewField({ commit }, id) {
      try {
        const ref = db.collection('users').doc(auth.currentUser.uid).collection('tasks').doc(id)
        const res = await ref.set({ time: 0 }, { merge: true })
        console.log('New field dateStart Add')
      } catch (err) { throw err }
    }
  },
  getters: {
  }
}