import { auth } from "@/main.js";
import { db } from "@/main.js";

export default {
  actions: {
    async regist({ commit }, { email, password }) {
      try {
        const datenow = Date.now().toString()
        await auth.createUserWithEmailAndPassword(email, password)
        const uid = auth.currentUser.uid
        await db.collection("users").doc(uid).set({})

        const ref = db.collection("users").doc(uid)
        await ref.collection("napravs").doc(datenow).set({ id: datenow, type: 'napravs', title: 'Пример направления' })
        await ref.collection("projects").doc(datenow).set({ id: datenow, type: 'projects', title: 'Пример проекта', idnapravs: datenow })
        await ref.collection("tasks").doc(datenow).set({ id: datenow, type: 'tasks', title: 'Пример задачи', idnapravs: datenow, idprojects: datenow })
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
    }
  }
}