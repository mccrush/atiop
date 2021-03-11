import { auth } from "@/firebase.js";
// Это будет нужно при регистрации пользователя
//import { db } from "@/firebase.js";
//import createTask from '@/scripts/createTask'

export default {
  state: {
    userId: null,
  },
  mutations: {
    setUserId(state, id) {
      state.userId = id
    }
  },
  actions: {
    // async regist({ commit }, { email, password }) {
    //   try {
    //     const datenow = Date.now().toString()
    //     await auth.createUserWithEmailAndPassword(email, password)
    //     const uid = auth.currentUser.uid
    //     await db.collection("users").doc(uid).set({
    //       email,
    //       status: 'free',
    //       dateCreate: datenow
    //     })

    //     const ref = db.collection("users").doc(uid)
    //     await ref.collection("napravs").doc(datenow).set(createTask(
    //       datenow, 'Пример направления', 'napravs', '', '', 0, 'Пример направления', 'Пример проекта'
    //     ))
    //     await ref.collection("projects").doc(datenow).set(createTask(
    //       datenow, 'Пример проекта', 'projects', datenow, '', 0, 'Пример направления', 'Пример проекта'
    //     ))
    //     await ref.collection("tasks").doc(datenow).set(createTask(
    //       datenow, 'Пример задачи', 'tasks', datenow, datenow, 0, 'Пример направления', 'Пример проекта'
    //     ))
    //   } catch (err) {
    //     throw err
    //   }
    // },
    async logIn({ commit }, { email, password }) {
      try {
        const res = await auth.signInWithEmailAndPassword(email, password)
        // Сдлеать проверку res, и возвращать true
      } catch (err) {
        // Передать сообщение об ошибке в шину
        throw err
      }
    },
    async logOut() {
      await auth.signOut()
    }
  },
  getters: {
    userId: state => state.userId,
  }
}