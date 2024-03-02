import directionClass from './../classes/directionClass'
import projectClass from './../classes/projectClass'
import taskClass from './../classes/taskClass'
import tagsClass from './../classes/tagsClass'

export const modelsFactory = ({ type, parentId }) => {
  let newObject = {}

  switch (type) {
    case 'direction':
      newObject = new directionClass()
      break
    case 'project':
      newObject = new projectClass({ parentId })
      break
    case 'task':
      newObject = new taskClass({ parentId })
      break
    case 'tags':
      newObject = new tagsClass()
      break
  }

  return Object.assign({}, newObject)
}