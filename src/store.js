import Vue from 'vue'
import Vuex from 'vuex'
import { fb, db } from "@/main.js";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: '',
    sphe: '',
    proj: '',
    list: '',
    task: '',
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
        console.info("%c Document successfully written!", 'color: #28a745');
      }); // Сохраняет на сервере
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

      db.collection('user').doc(state.userId).update({ [payload.spheid]: state.mainObject[payload.spheid] }).then(function () {
        console.info("%c Document successfully updated!", 'color: #28a745');
      })
        .catch(function (error) {
          console.error("Store.js: во время обновления произошла ошибка", error);
        }); // Сохраняет на сервере
    },
    deleteElement(state, payload) {
      if (payload.type == 's') {
        delete state.mainObject[payload.spheid]; // Удаляет с локального хранилища
        let res = db.collection('user').doc(state.userId).update({
          [payload.spheid]: fb.FieldValue.delete()
        }); // Удаляет на сервере
      } else if (payload.type == 'p') {
        delete state.mainObject[payload.spheid].child[payload.projid]; // Удаляет с локального хранилища
        db.collection('user').doc(state.userId).update({ [payload.spheid]: state.mainObject[payload.spheid] }).then(function () {
          console.info("%c Document successfully deleted!", 'color: #28a745');
        })
          .catch(function (error) {
            // Возможно документ еще не существует
            console.error("Store.js: во время обновления произошла ошибка", error);
          }); // Удаляет с сервера
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
