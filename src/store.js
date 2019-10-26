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
    uemail: '',
    spheArr: [],
    projArr: [],
    listArr: [],
    taskArr: []
  },
  mutations: {
    'SET_STORE'(state, products) {
      state.spheArr = products.sphe;
      state.projArr = products.proj;
      state.listArr = products.list;
      state.taskArr = products.task;
    },
    addDoc(state) {
      db.collection('user').doc(auth.currentUser.uid).set({ sphe: [], proj: [], list: [], task: [] }).then(() => {
        console.info("%c Document successfully created!", 'color: #28a745');
      }).catch(error => {
        console.error("Store.js: во время создания документа произошла ошибка", error);
      });
    },
    addItem(state, payload) {
      state[payload.type + 'Arr'].push(payload.item);

      db.collection('user').doc(auth.currentUser.uid).update({ [payload.type]: state[payload.type + 'Arr'] }).then(function () {
        console.info("%c Document successfully added!", 'color: #28a745');
      }).catch(function (error) {
        console.error("Store.js: во время создания элемента произошла ошибка", error);
      });
    },
    renameElement(state, payload) {
      let index = '';

      index = state[payload.type + 'Arr'].findIndex(item => item.id == payload[payload.type + 'Id']);

      if (index != -1) {
        state[payload.type + 'Arr'][index].title = payload.title;
      }

      db.collection('user').doc(auth.currentUser.uid).update({ [payload.type]: state[payload.type + 'Arr'] }).then(() => {
        console.info("%c Document successfully renamed!", 'color: #28a745');
      }).catch((error) => {
        console.error("Store.js: во время обновления после переименования элемента произошла ошибка", error);
      });
    },
    deleteElement(state, payload) {
      let index = '';

      index = state[payload.type + 'Arr'].findIndex(item => item.id == payload[payload.type + 'Id']);

      if (index != -1) {
        state[payload.type + 'Arr'].splice(index, 1);
      }

      db.collection('user').doc(auth.currentUser.uid).update({ [payload.type]: state[payload.type + 'Arr'] }).then(function () {
        console.info("%c Document successfully deleted!", 'color: #28a745');
      }).catch(function (error) {
        console.error("Store.js: во время обновления после удаления элемента произошла ошибка", error);
      });

      if (payload.type == 'sphe') {
        let newArray = state.projArr.filter(
          proj => proj.sphe !== payload.spheId
        );

        db.collection('user').doc(auth.currentUser.uid).update({ proj: newArray }).then(function () {
          console.info("%c Projects successfully deleted!", 'color: #28a745');
        }).catch(function (error) {
          console.error("Store.js: во время обновления после удаления проектов произошла ошибка", error);
        });
      }
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
        this.commit('SET_STORE', querySnapshot.data());
      }).catch(error => {
        console.log("Store.js initStore: при получении данных с сервера произошла ошибка", error);
      });
    }
  },
  getters: {
    spheArr: state => state.spheArr,
    projArr: state => state.projArr,
    listArr: state => state.listArr,
    taskArr: state => state.taskArr,
  }
})
