import fireApp from './../../firebase'
import { getAuth, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, createUserWithEmailAndPassword } from 'firebase/auth'

const auth = getAuth(fireApp)
auth.languageCode = 'ru'

export default {
  state: {
    currentUserId: '',
    countLogoClick: 0
  },
  mutations: {
    setCurrentUserId(state, value) {
      state.currentUserId = value
    },
    setCountLogoClick(state) {
      state.countLogoClick++
    },
  },
  actions: {
    async logIn({ commit }, { email, password }) {
      try {
        await signInWithEmailAndPassword(auth, email, password)
        return true
      } catch (err) {
        console.error('store user.js logIn(): Ошибка при входе в систему, err:', err)
        throw err
      }
    },

    async logOut({ commit }) {
      try {
        await signOut(auth)
        return true
      } catch (err) {
        console.error('store user.js logOut(): Ошибка при выходе из системы, err:', err)
      }
    },

    resetPass({ commit }, { email }) {
      try {
        console.log(`user.js resetPass() email: ${email}`)
        sendPasswordResetEmail(auth, email)
        alert(`Ссылка для сброса пароля отправленна на email: ${email}`)
      } catch (err) {
        console.error('user.js resetPass(): Ошибка при сбросе пароля, err:', err)
      }
    },

    async registerUser({ commit }, { email, password }) {
      try {
        await createUserWithEmailAndPassword(auth, email, password)
        return true
      } catch (err) {
        console.error('store user.js registerUser(): Ошибка при регистрации, err:', err)
        throw err
      }
    }
  },
  getters: {
    currentUserId: state => state.currentUserId,
    countLogoClick: state => state.countLogoClick
  }

}