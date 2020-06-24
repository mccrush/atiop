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
    async regist({ commit }, { email, password }) {
      try {
        await auth.createUserWithEmailAndPassword(email, password).then(() => {
          // Add new user in userc collections
          const datenow = Date.now().toString()
          db.collection("users").doc(auth.currentUser.uid).set({}).then(function () {
            const ref = db.collection("users").doc(auth.currentUser.uid)
            ref.collection("napravs").doc(datenow).set({ id: datenow, type: 'napravs', title: 'Пример направления' })
            ref.collection("projects").doc(datenow).set({ id: datenow, type: 'projects', title: 'Пример проекта', idnapravs: datenow })
            ref.collection("tasks").doc(datenow).set({ id: datenow, type: 'tasks', title: 'Пример задачи', idnapravs: datenow, idprojects: datenow })
            //console.log("Коллекции успешно созданы");
          })
            .catch(function (error) {
              console.error("Ошибка при создании коллекций: ", error);
            });
        }).catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.error("regist: errors:", errorCode, "& ", errorMessage);
        });
      } catch (err) { }
    },
    async logIn({ commit }, { email, password }) {
      try {
        await auth.signInWithEmailAndPassword(email, password)
      } catch (err) {
        throw err
      }


      // auth
      //   .signInWithEmailAndPassword(email, password)
      //   .then((user) => {
      //     commit('logIn', user)
      //   })
      //   .catch(function (error) {
      //     var errorCode = error.code;
      //     var errorMessage = error.message;
      //     console.error("Login: errors:", errorCode, "& ", errorMessage);
      //   });
    },
    async logOut({ commit }) {
      await auth.signOut()

      // auth
      //   .signOut()
      //   .then(() => {
      //     commit('logOut')
      //   })
      //   .catch(function (error) {
      //     console.error("logOut: errors:", error);
      //   });
    }
  },
  getters: {
    user: state => state.user
  }
}