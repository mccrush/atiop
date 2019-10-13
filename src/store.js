import Vue from 'vue'
import Vuex from 'vuex'
import { fb, db, auth } from "@/main.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sphe: '',
    proj: '',
    mainObject: {},
    uid: '',
    uemail: ''
  },
  mutations: {
    'SET_STORE'(state, products) {
      state.mainObject = products;
    },
    // getMainObject(state) {
    //   db.collection('user').doc(auth.currentUser.uid).get().then(querySnapshot => {
    //     console.log('Получены данные querySnapshot.data():', querySnapshot.data());
    //     state.mainObject = querySnapshot.data();
    //     commit('SET_STORE', querySnapshot.data());
    //   }).catch(error => {
    //     console.log("Store.js: при получении данных с сервера произошла ошибка", error);
    //   });
    // },
    addDoc(state) {
      db.collection('user').doc(auth.currentUser.uid).set({}).then(() => {
        console.info("%c Document successfully created!", 'color: #28a745');
      }).catch(error => {
        console.error("Store.js: во время создания документа произошла ошибка", error);
      });
    },
    addItem(state, payload) {
      switch (payload.type) {
        case 's':
          state.mainObject[payload.spheId] = payload.item;
          break;
        case 'p':
          state.mainObject[payload.spheId].child[payload.item.prop.id] = payload.item;
          break;
        case 'l':
          state.mainObject[payload.spheId].child[payload.projId].child[payload.item.prop.id] = payload.item;
          break;
        case 't':
          state.mainObject[payload.spheId].child[payload.projId].child[payload.listId].child[payload.item.prop.id] = payload.item;
          break;
        default:
          console.error("Store: Ошибка при создании элемента!");
      }

      db.collection('user').doc(auth.currentUser.uid).update({ [payload.spheId]: state.mainObject[payload.spheId] }).then(function () {
        console.info("%c Document successfully added!", 'color: #28a745');
      }).catch(function (error) {
        console.error("Store.js: во время создания элемента произошла ошибка", error);
      });
    },
    renameElement(state, payload) {
      switch (payload.type) {
        case 's':
          state.mainObject[payload.spheId].prop.title = payload.title;
          break;
        case 'p':
          state.mainObject[payload.spheId].child[payload.projId].prop.title = payload.title;
          break;
        case 'l':
          state.mainObject[payload.spheId].child[payload.projId].child[payload.listId].prop.title = payload.title;
          break;
        case 't':
          state.mainObject[payload.spheId].child[payload.projId].child[payload.listId].child[payload.taskId].prop.title = payload.title;
          break;
        default:
          console.error("Store: Ошибка при переименовании элемента!");
      }

      db.collection('user').doc(auth.currentUser.uid).update({ [payload.spheId]: state.mainObject[payload.spheId] }).then(() => {
        console.info("%c Document successfully renamed!", 'color: #28a745');
      }).catch((error) => {
        // Возможно документ еще не существует
        console.error("Store.js: во время обновления после переименования элемента произошла ошибка", error);
      }); // Обновляет на сервере
    },
    deleteSphe(state, payload) {
      delete state.mainObject[payload.spheId];
      db.collection('user').doc(auth.currentUser.uid).update({
        [payload.spheId]: fb.FieldValue.delete()
      });
    },
    deleteElement(state, payload) {
      switch (payload.type) {
        case 'p':
          delete state.mainObject[payload.spheId].child[payload.projId];
          break;
        case 'l':
          delete state.mainObject[state.sphe].child[state.proj].child[payload.listId];
          break;
        case 't':
          delete state.mainObject[state.sphe].child[state.proj].child[payload.listId].child[payload.taskId];
          break;
        default:
          console.error("Store: Ошибка при удалении элемента!");
      }

      //Object.assign(state.mainObject, {});

      db.collection('user').doc(auth.currentUser.uid).update({ [payload.spheId]: state.mainObject[payload.spheId] }).then(function () {
        console.info("%c Document successfully deleted!", 'color: #28a745');
      }).catch(function (error) {
        console.error("Store.js: во время обновления после удаления элемента произошла ошибка", error);
      });
    },
    setUid(state, payload) {
      state.uid = payload.uid;
      state.uemail = payload.uemail;
    },
    clearUid(state) {
      state.uid = '';
      state.uemail = '';
    },
    setStateProjId(state, payload) {
      state.sphe = payload.spheId;
      state.proj = payload.projId;
    }
  },
  actions: {
    initStore(state) {
      db.collection('user').doc(auth.currentUser.uid).get().then(querySnapshot => {
        console.log('Получены данные querySnapshot.data():', querySnapshot.data());
        state.mainObject = querySnapshot.data();
        commit('SET_STORE', querySnapshot.data());
      }).catch(error => {
        console.log("Store.js: при получении данных с сервера произошла ошибка", error);
      });
    }
  },
  getters: {
    products: state => state.mainObject
  }
})
