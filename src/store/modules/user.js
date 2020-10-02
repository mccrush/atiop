import { auth } from "@/main.js";
import { db } from "@/main.js";
import createTask from '@/scripts/createTask'

export default {
  actions: {
    async regist({ commit }, { email, password }) {
      try {
        const datenow = Date.now().toString()
        await auth.createUserWithEmailAndPassword(email, password)
        const uid = auth.currentUser.uid
        await db.collection("users").doc(uid).set({
          email,
          status: 'free',
          dateCreate: datenow
        })

        const ref = db.collection("users").doc(uid)
        await ref.collection("napravs").doc(datenow).set(createTask(
          datenow, 'Пример направления', 'napravs', '', '', 0, 'Пример направления', 'Пример проекта'
        ))
        await ref.collection("projects").doc(datenow).set(createTask(
          datenow, 'Пример проекта', 'projects', datenow, '', 0, 'Пример направления', 'Пример проекта'
        ))
        await ref.collection("tasks").doc(datenow).set(createTask(
          datenow, 'Пример задачи', 'tasks', datenow, datenow, 0, 'Пример направления', 'Пример проекта'
        ))
      } catch (err) {
        // Передать сообщение об ошибке в шину
        throw err
      }
    },
    async logIn({ commit, dispatch }, { email, password }) {
      try {
        await auth.signInWithEmailAndPassword(email, password)
      } catch (err) {
        // Передать сообщение об ошибке в шину
        throw err
      }
    },
    async logOut() {
      await auth.signOut()
      localStorage.removeItem('at-settings')
      localStorage.removeItem('at-filterType')
      localStorage.removeItem('at-filterValue')
    }
  }
}