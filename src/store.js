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
        //console.log('Storejs: state.mainObject =', state.mainObject);
      })
        .catch(error => {
          console.log(error);
        });
    },
    addSphe(state, newData) {
      const spheId = Date.now();
      state.mainObject[spheId] = newData; // Сохраняет в локальное хранилище
      db.collection('user').doc(state.userId).set({ [spheId]: newData }, { merge: true }); // Сохраняет на сервере
      //console.log('Store: Date success added!:', state.mainObject);
    },
    addProj(state, payload) {
      //console.log('Пришли данные: newData:', payload.child, ' sid:', payload.spheid);
      const projId = Date.now();
      //let temObj = state.mainObject[payload.spheid]
      //temObj.child = 'ttesstt';
      //console.log('res: ', temObj);
      state.mainObject[payload.spheid].child = { [projId]: payload.child }; // Сохраняет в локальное хранилище
      db.collection('user').doc(state.userId).set({ [payload.spheid]: state.mainObject[payload.spheid] }, { merge: true }); // Сохраняет на сервере
      //console.log('Store: Date success added!:', state.mainObject);
    },
    deleteElement(state, elementId) {
      delete state.mainObject[elementId]; // Удаляет с локального хранилища
      let res = db.collection('user').doc(state.userId).update({
        [elementId]: fb.FieldValue.delete()
      }); // Удаляет на сервере
      //console.log('Store: Date success deleted!', state.mainObject);
    },
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
