import Vue from 'vue'
import Vuex from 'vuex'
import { db } from "@/main.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    spheArr: [],
    projArr: [],
    listArr: [],
    taskArr: [],
    sphe: '',
    proj: '',
    list: '',
    task: ''
  },
  mutations: {
    getArr(state, table) {
      db.collection(table)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            let tobj = doc.data();
            tobj.id = doc.id;
            state[table + 'Arr'].push(tobj);
            //console.log('store: tobj = ', tobj);
          });

        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  actions: {

  }
})
