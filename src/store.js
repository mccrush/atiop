import Vue from 'vue'
import Vuex from 'vuex'
import { db } from "@/main.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // spheArr: [],
    // projArr: [],
    // listArr: [],
    // taskArr: [],
    sphe: '',
    proj: '',
    // list: '',
    // task: '',
    timeup: '',
    allData: {},
    mapTask: {},
    userId: ''
  },
  mutations: {
    // getArr(state, table) {
    //   db.collection(table)
    //     .get()
    //     .then(querySnapshot => {
    //       querySnapshot.forEach(doc => {
    //         let tobj = doc.data();
    //         tobj.id = doc.id;
    //         state[table + 'Arr'].push(tobj);
    //         //console.log('store: tobj = ', tobj);
    //       });

    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
    getTask(state, uid) {
      db.collection('user').doc(uid)
        .get()
        .then(querySnapshot => {
          state.allData = querySnapshot.data();
          state.timeup = state.allData.timeup;
          let tempData = Object.assign({}, state.allData);
          delete tempData.timeup;
          state.mapTask = tempData
          console.log('Storejs: timeup =', state.timeup);
          console.log('Storejs: state.mapTask =', state.mapTask);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  actions: {

  }
})
