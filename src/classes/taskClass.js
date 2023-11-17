import ClassBasic from './ClassBasic'

export default class taskClass extends ClassBasic {
  constructor({ parentId }) {
    super()
    this.parentId = parentId
  }
  type = 'task'
  price = 0
  dateReminde = ''
}