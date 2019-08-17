import Vue from 'vue'
import Vuex from 'vuex'
import { db } from "@/main.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    spheArr: [],
    spheId: [],
    projArr: [],
    projId: [],
    listArr: [],
    listId: [],
    taskArr: [],
    taskId: [],
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
            state[table + 'Id'].push(doc.id);
            state[table + 'Arr'].push(doc.data());
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    setState(state, prop, val) {
      state[prop] = val;
    }
  },
  actions: {

  }
})
