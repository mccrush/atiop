import Vue from 'vue'
import Vuex from 'vuex'
import { db } from "@/main.js";

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
      db.collection('user').doc(state.userId)
        .get()
        .then(querySnapshot => {
          // let allData = querySnapshot.data();
          // state.timeup = allData.timeup;
          // let tempData = Object.assign({}, allData);
          // delete tempData.timeup;
          // state.mainObject = tempData
          //console.log('Storejs: timeup =', state.timeup);
          //console.log('Storejs: state.mapTask =', state.mainObject);
          state.mainObject = querySnapshot.data();
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateMainObject(state, newData) {
      state.mainObject[Date.now()] = newData;
      store.commit('saveOnServer')
    },
    saveOnServer(state) {
      //state.mainObject['timeup'] = Date.now();
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
