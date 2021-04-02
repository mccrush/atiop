import { auth } from '@/firebase.js'
import { db } from '@/firebase.js'

export default {
  actions: {
    // Добавление нового свойста задаче
    // Возможно, лучше использовать только как инструмент администратора
    async addNewField({ commit }, { id }) {
      try {
        const ref = db.collection('users').doc(auth.currentUser.uid).collection('items').doc(id)
        const res = await ref.set({ sortDir: 'asc' }, { merge: true })
        console.log('New field dateStart Add')
      } catch (error) { console.log('admin.js: addNewField(): ', error) }
    },
  },
}