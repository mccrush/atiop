import taskClass from './../../classes/taskClass'
//import store from './../../../store/index'

export const taskFabrica = () => {
  // const colum = store.getters['colum' + boardTypeAlias]
  // const position = colum.length + 1
  let newObject = new taskClass()
  return Object.assign({}, newObject)
}