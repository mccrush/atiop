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
      // Но сначала сверить времена, стоит ли обращаться за данными
      db.collection('user').doc(state.userId).get().then(querySnapshot => {
        // let allData = querySnapshot.data();
        // state.timeup = allData.timeup;
        // let tempData = Object.assign({}, allData);
        // delete tempData.timeup;
        // state.mainObject = tempData
        //console.log('Storejs: timeup =', state.timeup);
        //console.log('Storejs: state.mapTask =', state.mainObject);
        state.mainObject = querySnapshot.data();
        console.log('Storejs: state.mainObject =', state.mainObject);
      })
        .catch(error => {
          console.log(error);
        });
    },
    addSpheInMainObject(state, newData) {
      state.mainObject[Date.now()] = newData;
      console.log('Store: Date success added!:', state.mainObject);
    },
    deleteFromMainObject(state, spheId) {
      delete state.mainObject[spheId]
      let res = db.collection('user').doc(state.userId).update({
        spheId: fb.FieldValue.delete()
      });
      console.log('Store: Date success deleted!: res = ', res, ' ', state.mainObject);
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
