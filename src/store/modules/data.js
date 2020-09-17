
import { auth } from "@/main.js";
import { db } from "@/main.js";

export default {
  state: {
    napravs: [],
    projects: [],
    tasks: [],
    settings: JSON.parse(localStorage.getItem('settings')) || { showArhived: false, showEmpty: true, showPosition: false, showDate: false, showDeadline: false, showNaprav: false, showProject: false, showPrice: false, sortBy: 'date' },
    status: [{ id: 'todo', title: 'Новые' }, { id: 'work', title: 'В работе' }, { id: 'done', title: 'Завершенные' }]
  },
  mutations: {
    getItems(state, { type, items = [] }) {
      state[type] = items
    },
    addItem(state, item) {
      state[item.type].push(item)
    },
    removeItem(state, { id, type }) {
      state[type] = state[type].filter(item => item.id !== id)
    },
    updateItem(state, { id, title, desc, type, position, status, date, deadline, color, napravId, napravTitle, projectId, projectTitle, price }) {
      const items = state[type].concat()
      const index = items.findIndex(el => el.id === id)
      let el = items[index]
      items[index] = { ...el, title, desc, type, position, status, date, deadline, color, napravId, napravTitle, projectId, projectTitle, price }
      state[type] = items
    },
    updateSettings(state, { showArhived, showEmpty, showPosition, showDate, showDeadline, showNaprav, showProject, showPrice, sortBy }) {
      state.settings = { showArhived, showEmpty, showPosition, showDate, showDeadline, showNaprav, showProject, showPrice, sortBy }
      localStorage.setItem('settings', JSON.stringify(state.settings))
    }
  },
  actions: {
    // Возможно, лучше использовать как инструмент администратора
    async addNewField({ commit }, id) {
      try {
        const ref = db.collection("users").doc(auth.currentUser.uid).collection('tasks').doc(id)
        const res = await ref.set({ price: 0 }, { merge: true })
        console.log('New field Add');
      } catch (err) { throw err }
    },
    async getItems({ commit }, type) {
      let items = []
      try {
        const ref = db.collection("users").doc(auth.currentUser.uid).collection(type)
        const querySnapshot = await ref.get()
        querySnapshot.forEach(function (doc) {
          items.push(doc.data())
        });
      } catch (err) { throw err } finally { commit('getItems', { type, items }) }
    },

    addItem({ commit, dispatch }, item) {
      const ref = db.collection("users").doc(auth.currentUser.uid)
      ref.collection(item.type).doc(item.id).set(item).then(() => {
        console.log('addItem, Элемент добавлен:');
        commit('addItem', item)
        // Вообще это надо, но только для проектов
        // if (item.type === 'tasks') {
        //   dispatch('updateProjectLength', { id: item.idprojects, whatdo: 'add' })
        // }
      }).catch(err => {
        console.log('addItem, Ошибка при добавлении документа:', err);
      })
    },

    removeItem({ commit, dispatch }, { id, type, idproj }) {
      db.collection("users").doc(auth.currentUser.uid).collection(type).doc(id).delete().then(function () {
        console.log("removeItem, Document successfully deleted!");
        commit('removeItem', { id, type })
        // Вообще это надо, но пока не используется
        // удалять всех детей родителя
        // if (type === 'tasks') {
        //   dispatch('updateProjectLength', { id: idproj, whatdo: 'remove' })
        // }
      }).catch(function (error) {
        console.error("removeItem, Error removing document: ", error);
      });
    },
    updateItem({ commit }, { id, title, desc, type, position, status, date, deadline, color, napravId, napravTitle, projectId, projectTitle, price }) {
      const ref = db.collection("users").doc(auth.currentUser.uid)
      const el = ref.collection(type).doc(id).get().then(doc => doc.data())
      return ref.collection(type).doc(id).update({ ...el, title, type, position, status, date, deadline, color, napravId, napravTitle, projectId, projectTitle, price })
        .then(function () {
          console.log("updateItem, Document successfully updated!");
          commit('updateItem', { id, title, desc, type, position, status, date, deadline, color, napravId, napravTitle, projectId, projectTitle, price })
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("updateItem, Error updating document: ", error);
        });
    },
    async updateProjectLength({ commit, dispatch }, { id, whatdo }) {
      const ref = db.collection("users").doc(auth.currentUser.uid).collection('projects').doc(id)
      const doc = await ref.get()
      let length = doc.data().length
      if (whatdo === 'add') { length++ }
      else { length-- }
      await ref.update({ ...doc.data(), length })
      dispatch('getItems', 'projects')
    },
    async changeStatus({ commit, dispatch }, { id, type, status, dateDone }) {
      const ref = db.collection("users").doc(auth.currentUser.uid).collection(type).doc(id)
      const doc = await ref.get()
      //let status = 'done'
      await ref.update({ ...doc.data(), status, dateDone })
      dispatch('getItems', type)
    }
  },
  getters: {
    napravs: state => state.napravs,
    projects: state => state.projects,
    tasks: state => state.tasks,
    settings: state => state.settings,
    status: state => state.status,
    nepravsLength: state => state.napravs.length,
    projectsLength: state => state.projects.length,
    tasksLength: state => state.tasks.length
  }
}
