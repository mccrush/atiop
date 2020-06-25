import { auth } from "@/main.js";
import { db } from "@/main.js";

export default {
  state: {
    // user: null
    user: { uid: '', email: '' }
  },
  mutations: {
    logIn(state, user) {
      // state.user = {
      //   uid: auth.currentUser.uid,
      //   email: auth.currentUser.email,
      //   name: auth.currentUser.name,
      // }
      state.user.uid = user.uid
      state.user.email = user.email
    },
    logOut(state) {
      state.user = null;
    }
  },
  actions: {
    async regist({ commit, dispatch }, { email, password }) {
      try {
        const uid = auth.currentUser.uid
        const datenow = Date.now().toString()
        await auth.createUserWithEmailAndPassword(email, password)
        await db.collection("users").doc(uid).set({})

        const ref = db.collection("users").doc(uid)
        await ref.collection("napravs").doc(datenow).set({ id: datenow, type: 'napravs', title: 'Пример направления' })
        await ref.collection("projects").doc(datenow).set({ id: datenow, type: 'projects', title: 'Пример проекта', idnapravs: datenow })
        await ref.collection("tasks").doc(datenow).set({ id: datenow, type: 'tasks', title: 'Пример задачи', idnapravs: datenow, idprojects: datenow })


        // .then(() => {
        //   const datenow = Date.now().toString()
        //   db.collection("users").doc(auth.currentUser.uid).set({}).then(function () {
        //     const ref = db.collection("users").doc(auth.currentUser.uid)
        //     ref.collection("napravs").doc(datenow).set({ id: datenow, type: 'napravs', title: 'Пример направления' })
        //     ref.collection("projects").doc(datenow).set({ id: datenow, type: 'projects', title: 'Пример проекта', idnapravs: datenow })
        //     ref.collection("tasks").doc(datenow).set({ id: datenow, type: 'tasks', title: 'Пример задачи', idnapravs: datenow, idprojects: datenow })
        //   })
        //     .catch(function (error) {
        //       console.error("Ошибка при создании коллекций: ", error);
        //     });
        // }).catch(function (error) {
        //   var errorCode = error.code;
        //   var errorMessage = error.message;
        //   console.error("regist: errors:", errorCode, "& ", errorMessage);
        // });
      } catch (err) {
        // Передать ошибку в шину
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
  },
  getters: {
    user: state => state.user
  }
}