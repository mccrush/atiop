import Vue from 'vue'
import Vuex from 'vuex'
import { fb, db } from "@/main.js";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: '',
    tecSpheId: '',
    tecProjId: '',
    //timeup: '', // Время последнего изменения данных
    mainObject: {},
    userId: ''
  },
  mutations: {
    getMainObject(state) {
      // Но сначала сверить времена, стоит ли обновлять данные
      db.collection('user').doc(state.userId).get().then(querySnapshot => {
        state.mainObject = querySnapshot.data();
      })
        .catch(error => {
          console.log("Store.js: при получении данных с сервера произошла ошибка", error);
        });
    },
    addSphe(state, newData) {
      const spheId = Date.now();
      state.mainObject[spheId] = newData; // Сохраняет в локальное хранилище
      db.collection('user').doc(state.userId).set({ [spheId]: newData }, { merge: true }).then(function () {
        console.info("Document successfully written!");
      }); // Сохраняет на сервере
    },
    addProj(state, payload) {
      console.log('Пришли данные в addProj: newData:', payload.child, ' sid:', payload.spheid);
      const projId = Date.now();
      if (!state.mainObject[payload.spheid].child) {
        state.mainObject[payload.spheid].child = {}; // Если такого поля еще нет, то создает
      }
      state.mainObject[payload.spheid].child[projId] = payload.child; // Сохраняет в локальное хранилище
      db.collection('user').doc(state.userId).update({ [payload.spheid]: state.mainObject[payload.spheid] }).then(function () {
        console.info("Document successfully updated!");
      })
        .catch(function (error) {
          // Возможно документ еще не существует
          console.error("Store.js: во время обновления произошла ошибка", error);
        }); // Сохраняет на сервере
    },
    deleteElement(state, payload) {
      if (payload.type == 's') {
        delete state.mainObject[payload.spheid]; // Удаляет с локального хранилища
        let res = db.collection('user').doc(state.userId).update({
          [elementId]: fb.FieldValue.delete()
        }); // Удаляет на сервере
      } else if (payload.type == 'p') {
        delete state.mainObject[payload.spheid].child[payload.projid]; // Удаляет с локального хранилища
        let res = db.collection('user').doc(state.userId).update({
          [payload.spheid]: {
            child: {
              [payload.projid]: fb.FieldValue.delete()
            }
          }
        }); // Удаляет на сервере
      }

    },
    // Что делает этот метод?
    saveOnServer(state) {
      //let updateState = db.collection('user').doc(state.userId).update



      let updateState = db.collection('user').doc(state.userId).update(state.mainObject);
      if (updateState) {
        console.log('Store: Date success updated!');
      } else {
        console.log('Store: Errore in update process');
      }
    }
  },
  actions: {

  }
})
