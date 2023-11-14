import { directionFabrica } from './directionFabrica'
import { projectFabrica } from './projectFabrica'
import { taskFabrica } from './taskFabrica'

export const mainFabrica = ({ type, parentId }) => {
  switch (type) {
    case 'direction':
      return directionFabrica()
    case 'project':
      return projectFabrica({ parentId })
    case 'task':
      return taskFabrica({ parentId })
  }
}