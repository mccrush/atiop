import { directionFabrica } from './directionFabrica'
import { projectFabrica } from './projectFabrica'
import { taskFabrica } from './taskFabrica'

export const mainFabrica = ({ type }) => {
  switch (type) {
    case 'direction':
      return directionFabrica()
    case 'project':
      return projectFabrica()
    case 'task':
      return taskFabrica()
  }
}