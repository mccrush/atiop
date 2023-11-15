import directionClass from './../classes/directionClass'
import projectClass from './../classes/projectClass'
import taskClass from './../classes/taskClass'

export const modelsFactory = ({ type, parentId }) => {
  let newObject = {}

  switch (type) {
    case 'direction':
      newObject = new directionClass()
    case 'project':
      newObject = new projectClass({ parentId })
    case 'task':
      newObject = new taskClass({ parentId })
  }

  return Object.assign({}, newObject)
}