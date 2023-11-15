import client from './../classes/client'
import kotel from './../classes/kotel'
import order from './../classes/order'
import stage from './../classes/stage'
import stageProduction from './../classes/stageProduction'
import obrabotka from './../classes/obrabotka'
import user from './../classes/user'

export const modelsFactory = (type) => {
  let newObject = {}

  switch (type) {
    case 'client':
      newObject = new client()
      break
    case 'kotel':
      newObject = new kotel()
      break
    case 'order':
      newObject = new order()
      break
    case 'stage':
      newObject = new stage()
      break
    case 'stageProduction':
      newObject = new stageProduction()
      break
    case 'obrabotka':
      newObject = new obrabotka()
      break
    case 'user':
      newObject = new user()
      break

  }

  return Object.assign({}, newObject)
}