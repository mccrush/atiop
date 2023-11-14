import projectClass from './../../classes/projectClass'
//import store from './../../../store/index'

export const projectFabrica = () => {
  // const colum = store.getters['colum' + boardTypeAlias]
  // const position = colum.length + 1
  let newObject = new projectClass()
  return Object.assign({}, newObject)
}