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
      ;
      state.spheArr = products.sphe;
      state.projArr = products.proj;
      state.listArr = products.list;
      state.taskArr = products.task;
    },
    addDoc(state) {
      db.collection('user').doc(auth.currentUser.uid).set({ sphe: [{}], proj: [{}], list: [{}], task: [{}] }).then(() => {
        console.info("%c Document successfully created!", 'color: #28a745');
      }).catch(error => {
        console.error("Store.js: во время создания документа произошла ошибка", error);
      });
    },
    addItem(state, payload) {
      let itemArr = [];
      switch (payload.type) {
        case 'sphe':
          //state.mainObject[payload.spheId] = payload.item;
          state.spheArr.push(payload.item);
          itemArr = state.spheArr;
          break;
        case 'proj':
          state.projArr.push(payload.item);
          itemArr = state.projArr;
          break;
        case 'list':
          state.listArr.push(payload.item);
          itemArr = state.listArr;
          break;
        case 'task':
          state.taskArr.push(payload.item);
          itemArr = state.taskArr;
          break;
        default:
          console.error("Store: Ошибка при создании элемента!");
      }

      db.collection('user').doc(auth.currentUser.uid).update({ [payload.type]: itemArr }).then(function () {
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
      }); //Комментарий
    },
    deleteSphe(state, payload) {
      //delete state.mainObject[payload.spheId];
      db.collection('user').doc(auth.currentUser.uid).update({
        [payload.type]: fb.FieldValue.delete()
      });
    },
    deleteElement(state, payload) {
      let itemArr = [];
      let index = '';
      switch (payload.type) {
        case 'sphe':
          //delete state.mainObject[payload.spheId].child[payload.projId];
          index = state.spheArr.findIndex(item => item.id == payload.spheId);
          if (index != -1) {
            state.spheArr.splice(index, 1);
            itemArr = state.spheArr;
          }
          break;
        case 'proj':
          delete state.mainObject[payload.spheId].child[payload.projId];
          break;
        case 'list':
          delete state.mainObject[state.sphe].child[state.proj].child[payload.listId];
          break;
        case 'task':
          delete state.mainObject[state.sphe].child[state.proj].child[payload.listId].child[payload.taskId];
          break;
        default:
          console.error("Store: Ошибка при удалении элемента!");
      }

      db.collection('user').doc(auth.currentUser.uid).update({ [payload.type]: itemArr }).then(function () {
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
        //state.mainObject = querySnapshot.data();
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
