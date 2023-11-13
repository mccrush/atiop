import store from './../store'
import { searchClientMethod } from './searchClientMethod'

export const searchOrderMethod = (array, searchValue) => {
  const arrayClients = store.getters.client
  const filteredClients = searchClientMethod(arrayClients, searchValue)

  let tempArray = []

  filteredClients.forEach(el => {
    tempArray = tempArray.concat(array.filter(item => item.clientId === el.id))
  })

  return tempArray
}