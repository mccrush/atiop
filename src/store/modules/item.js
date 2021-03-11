import { auth } from '@/firebase.js'
import { db } from '@/firebase.js'

export default {
  state: {
    napravs: [],
    projects: [],
    lists: [],
    tasks: [],
    loading2: false,
    napravId: localStorage.getItem('at-napravId') || '',
    projectId: localStorage.getItem('at-projectId') || '',
    listId: localStorage.getItem('at-listId') || '',
    viewType: localStorage.getItem('at-viewType') || 'napravs',
    viewView: localStorage.getItem('at-viewView') || 'kanban',
    arrayForRemove: [],
    arrayForRemoveLists: [],
    arrayForRemoveProjects: [],
  },
  mutations: {
    setViewType(state, type) {
      state.viewType = type
      localStorage.setItem('at-viewType', type)
    },
    setViewView(state, view) {
      state.viewView = view
      localStorage.setItem('at-viewView', view)
    },
    setId(state, { id, typeId }) {
      state[typeId] = id
      localStorage.setItem('at-' + typeId, id)
    },
    changeLoading(state, value) {
      state.loading2 = value
    },
    addItem(state, item) {
      state[item.type].push(item)
    },
    setItems(state, { type, items = [] }) {
      state[type] = items
    },
    changeTaskStatus(state, { id, status, dateStart, dateDone }) {

      let tasks = state.tasks.concat()
      const index = tasks.findIndex(task => task.id === id)
      const task = tasks[index]
      tasks[index] = { ...task, status, dateStart, dateDone }
      state.tasks = tasks
    },
    removeItem(state, { id, type }) {
      if (type === 'napravs') {
        state.arrayForRemoveTasks = state.tasks.filter(item => item.napravId === id)
        state.arrayForRemoveLists = state.lists.filter(item => item.napravId === id)
        state.arrayForRemoveProjects = state.projects.filter(item => item.napravId === id)
        state.tasks = state.tasks.filter(item => item.napravId !== id)
        state.lists = state.lists.filter(item => item.napravId !== id)
        state.projects = state.projects.filter(item => item.napravId !== id)
      } else if (type === 'projects') {
        state.arrayForRemoveTasks = state.tasks.filter(item => item.projectId === id)
        state.arrayForRemoveLists = state.lists.filter(item => item.projectId === id)
        state.arrayForRemoveProjects = []
        state.tasks = state.tasks.filter(item => item.projectId !== id)
        state.lists = state.lists.filter(item => item.projectId !== id)
      } else if (type === 'lists') {
        state.arrayForRemoveTasks = state.tasks.filter(item => item.listId === id)
        state.tasks = state.tasks.filter(item => item.listId !== id)
        state.arrayForRemoveLists = []
        state.arrayForRemoveProjects = []
      } else if (type === 'tasks') { state.arrayForRemoveTasks = [] }
      state[type] = state[type].filter(item => item.id !== id)
    },
  },
  actions: {
    async removeItem({ commit, state }, { id }) {
      try {
        commit('changeLoading', true)
        const REF = db.collection('users').doc(auth.currentUser.uid).collection('items')
        if (state.arrayForRemoveTasks.length) {
          state.arrayForRemoveTasks.forEach(item => {
            REF.doc(item.id).delete()
            console.log('Suc Tasks remove id:', item.id);
          })
        }
        if (state.arrayForRemoveLists.length) {
          state.arrayForRemoveLists.forEach(item => {
            REF.doc(item.id).delete()
            console.log('Suc List remove id:', item.id);
          })
        }
        if (state.arrayForRemoveProjects.length) {
          state.arrayForRemoveProjects.forEach(item => {
            REF.doc(item.id).delete()
            console.log('Suc Proj remove id:', item.id);
          })
        }
        await REF.doc(id).delete()
        commit('changeLoading', false)
        return true
      } catch (error) {
        console.log('Error items.js, action removeItem(): ', error);
      }
    },
    async updateItem({ commit, state }, { id, type }) {
      try {
        const item = state[type].find(item => item.id === id)
        const REF = db.collection('users').doc(auth.currentUser.uid).collection('items')
        await REF.doc(id).update(item)
        return true
      } catch (error) {
        console.log('Error items.js, action updateItem(): ', error);
      }
    },
    async addItem({ commit }, item) {
      try {
        commit('changeLoading', true)
        const REF = db.collection('users').doc(auth.currentUser.uid).collection('items')
        await REF.doc(item.id).set(item)
        commit('changeLoading', false)
        return true
      } catch (error) {
        console.log('Error items.js, action addItem(): ', error);
      }
    },
    async getItems({ commit }) {
      try {
        commit('changeLoading', true)
        let napravs = [], projects = [], lists = [], tasks = []
        let allLength = 0
        const REF = db.collection('users').doc(auth.currentUser.uid).collection('items')
        const snapshot = await REF.get()
        snapshot.forEach(doc => {
          if (doc.data().type === 'napravs') {
            napravs.push(doc.data())
          } else if (doc.data().type === 'projects') {
            projects.push(doc.data())
          } else if (doc.data().type === 'lists') {
            lists.push(doc.data())
          } else if (doc.data().type === 'tasks') {
            tasks.push(doc.data())
          }
          allLength++
        })

        commit('setItems', { type: 'napravs', items: napravs })
        commit('setItems', { type: 'projects', items: projects })
        commit('setItems', { type: 'lists', items: lists })
        commit('setItems', { type: 'tasks', items: tasks })
        //commit('setAllItemsLength', allLength)
        commit('changeLoading', false)
        console.log('Данные с сервера переданы в State')
      } catch (error) {
        console.log('Ошибка item.js: action getItems():', error)
      }
    }
  },
  getters: {
    napravs: state => state.napravs,
    projects: state => state.projects,
    lists: state => state.lists,
    tasks: state => state.tasks,
    loading: state => state.loading2,
    napravId: state => state.napravId,
    projectId: state => state.projectId,
    listId: state => state.listId,
    viewType: state => state.viewType,
    viewView: state => state.viewView,
    napravsLength: state => state.napravs.length,
    projectsLength: state => state.projects.length,
    listsLength: state => state.lists.length,
    tasksLength: state => state.tasks.length
  }
}