import Vue from 'vue'
import Vuex from 'vuex'
import { fb, db, auth } from "@/main.js";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sphe: '',
    proj: '',
    list: '',
    task: '',
    //timeup: '', // Время последнего изменения данных
    mainObject: {},
    spheArr: [],
    uid: '',
    uemail: ''
  },
  mutations: {
    getMainObject(state) {
      db.collection('user').doc(auth.currentUser.uid).get().then(querySnapshot => {
        state.spheArr = querySnapshot.data().sphe;
        console.log('Получены данные state.spheArr:', state.spheArr);
      }).catch(error => {
        console.log("Store.js: при получении данных с сервера произошла ошибка", error);
      });
    },
    addDoc(state) {
      db.collection('user').doc(auth.currentUser.uid).set({ sphe: [] }).then(() => {
        console.info("%c Document successfully created!", 'color: #28a745');
      }).catch(error => {
        console.error("Store.js: во время создания документа произошла ошибка", error);
      });
    },
    addSphe(state, payload) {
      state.spheArr.push(payload.sphe);
      db.collection('user').doc(auth.currentUser.uid).update({
        sphe: state.spheArr
      }).then(function () {
        console.info("%c Document successfully written!", 'color: #28a745');
      });
    },
    addElement(state, payload) {
      const itemId = Date.now();
      switch (payload.type) {
        case 'p':
          state.mainObject[payload.spheid].child[itemId] = payload.child;
          break;
        case 'l':
          state.mainObject[payload.spheid].child[payload.projid].child[itemId] = payload.child;
          break;
        case 't':
          state.mainObject[payload.spheid].child[payload.projid].child[payload.listid].child[itemId] = payload.child;
          break;
        default:
          alert("Ошибка при создании элемента!");
      }

      db.collection('user').doc(auth.currentUser.uid).update({ [payload.spheid]: state.mainObject[payload.spheid] }).then(function () {
        console.info("%c Document successfully updated!", 'color: #28a745');
      }).catch(function (error) {
        console.error("Store.js: во время обновления после создания элемента произошла ошибка", error);
      }); // Сохраняет на сервере
    },
    renameElement(state, payload) {
      switch (payload.type) {
        case 'p':
          state.mainObject[payload.spheid].child[payload.projid].prop.title = payload.title;
          break;
        case 'l':
          state.mainObject[payload.spheid].child[payload.projid].child[payload.listid].prop.title = payload.title;
          break;
        case 't':
          state.mainObject[payload.spheid].child[payload.projid].child[payload.listid].child[payload.taskid].prop.title = payload.title;
          break;
        default:
          alert("Ошибка при создании элемента!");
      }

      db.collection('user').doc(auth.currentUser.uid).update({ [payload.spheid]: state.mainObject[payload.spheid] }).then(() => {
        console.info("%c Document successfully renamed!", 'color: #28a745');
      }).catch((error) => {
        // Возможно документ еще не существует
        console.error("Store.js: во время обновления после переименования элемента произошла ошибка", error);
      }); // Обновляет на сервере
    },
    deleteSphe(state, payload) {
      let index = state.spheArr.findIndex((item) => item.id == payload.id);
      if (index !== -1) {
        state.spheArr.splice(index, 1);
        db.collection('user').doc(auth.currentUser.uid).update({
          sphe: state.spheArr
        }).then(() => {
          console.info("%c Sphe successfully deleted!", 'color: #28a745');
        }).catch((error) => {
          console.error("Store.js: во время удаления сферы произошла ошибка", error);
        });
      }
    },
    deleteElement(state, payload) {
      switch (payload.type) {
        case 'p':
          delete state.mainObject[payload.spheid].child[payload.projid];
          break;
        case 'l':
          delete state.mainObject[payload.spheid].child[payload.projid].child[payload.listid];
          break;
        case 't':
          delete state.mainObject[payload.spheid].child[payload.projid].child[payload.listid].child[payload.taskid];
          break;
        default:
          alert("Ошибка при создании элемента!");
      }

      db.collection('user').doc(auth.currentUser.uid).update({ [payload.spheid]: state.mainObject[payload.spheid] }).then(function () {
        console.info("%c Document successfully deleted!", 'color: #28a745');
      }).catch(function (error) {
        // Возможно документ еще не существует
        console.error("Store.js: во время обновления после удаления элемента произошла ошибка", error);
      }); // Удаляет с сервера
    },
    setUid(state, payload) {
      state.uid = payload.uid;
      state.uemail = payload.uemail;
    },
    clearUid(state) {
      state.uid = '';
      state.uemail = '';
    }
  },
  actions: {

  }
})
