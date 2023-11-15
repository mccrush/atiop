import directionClass from './../../classes/directionClass'
//import store from './../../../store/index'

export const directionFabrica = () => {
  // const colum = store.getters['colum' + boardTypeAlias]
  // const position = colum.length + 1
  let newObject = new directionClass()
  return Object.assign({}, newObject)
}