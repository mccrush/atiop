import ClassBasic from './ClassBasic'

export default class projectClass extends ClassBasic {
  constructor({ parentId }) {
    super()
    this.parentId = parentId
  }
  type = 'project'
}


