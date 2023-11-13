// Класс Основной с общими свойствами
import getId from './../helpers/getId'
import getDateNow from './../helpers/getDateNow'

export default class ClassBasic {
  constructor() {
    this.id = getId()
    this.dateCreate = getDateNow()
  }

  type = ''
  title = ''
  description = ''
  position = 1
  status = 'active'
}