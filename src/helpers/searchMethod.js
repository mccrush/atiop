import { searchClientMethod } from './searchClientMethod'
import { searchOrderMethod } from './searchOrderMethod'

export const searchMethod = (array, type, searchValue) => {
  if (searchValue) {
    if (type === 'client') {
      return searchClientMethod(array, searchValue)
    }
    else if (type === 'kotel') {
      return array
    }
    else if (type === 'order') {
      return searchOrderMethod(array, searchValue)
    }
    if (type === 'clientStatus') {
      return array.filter(
        item =>
          item.name.split(' ')[0].toLowerCase() === searchValue.toLowerCase() ||
          item.phone.toLowerCase() == searchValue.toLowerCase()
      )
    }
    else if (type === 'status') {
      return array.filter(
        item =>
          item.clientId === searchValue)
    }
    else {
      return array
    }
  }
  return array
}