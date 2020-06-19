import { auth } from "@/main.js";

export default {
  state: {
    user: null
  },
  mutations: {
    logIn(state) {
      state.user = {
        uid: auth.currentUser.uid,
        email: auth.currentUser.email,
        name: auth.currentUser.name,
      }
    },
    logOut(state) {
      state.user = null;
    }
  },
  actions: {
    logIn({ commit }, { email, password }) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          commit('logIn')
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.error("Login: errors:", errorCode, "& ", errorMessage);
        });
    },
    logOut({ commit }) {
      auth
        .signOut()
        .then(() => {
          commit('logOut')
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  },
  getters: {
    user: state => state.user
  }
}