import taskClass from './../../classes/taskClass'
//import store from './../../../store/index'

export const taskFabrica = ({ parentId }) => {
  // const colum = store.getters['colum' + boardTypeAlias]
  // const position = colum.length + 1
  let newObject = new taskClass({ parentId })
  return Object.assign({}, newObject)
}