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
    mainObject: {},
    spheArr: [],
    uid: '',
    uemail: ''
  },
  mutations: {
    getMainArray(state) {
      db.collection('user').doc(auth.currentUser.uid).get().then(querySnapshot => {
        state.mainObject = querySnapshot.data();
        console.log('Получены данные state.mainObject:', state.mainObject);
      }).catch(error => {
        console.log("Store.js: при получении данных с сервера произошла ошибка", error);
      });
    },
    addDoc(state) {
      db.collection('user').doc(auth.currentUser.uid).set({}).then(() => {
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
    addItem(state, payload) {
      switch (payload.type) {
        case 's':
          state.mainObject[payload.spheId] = payload.sphe;
          break;
        case 'p':
          state.mainObject[payload.spheId].child[payload.proj.prop.id] = payload.proj;
          break;
        case 'l':
          state.mainObject[payload.spheId].child[payload.projId].child[payload.list.prop.id] = payload.list;
          break;
        case 't':
          state.mainObject[payload.spheId].child[payload.projId].child[payload.listId].child[payload.task.prop.id] = payload.task;
          break;
        default:
          console.error("Store: Ошибка при создании элемента!");
      }

      db.collection('user').doc(auth.currentUser.uid).update({ [payload.spheId]: state.mainObject[payload.spheId] }).then(function () {
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
          console.error("Store: Ошибка при переименовании элемента!");
      }

      db.collection('user').doc(auth.currentUser.uid).update({ [payload.spheid]: state.mainObject[payload.spheid] }).then(() => {
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
          delete state.mainObject[payload.spheid].child[payload.projid];
          break;
        case 'l':
          delete state.mainObject[payload.spheid].child[payload.projid].child[payload.listid];
          break;
        case 't':
          delete state.mainObject[payload.spheid].child[payload.projid].child[payload.listid].child[payload.taskid];
          break;
        default:
          console.error("Store: Ошибка при удалении элемента!");
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
