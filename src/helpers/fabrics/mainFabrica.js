import { taskFabrica } from './taskFabrica'

export const mainFabrica = ({ type }) => {
  switch (type) {
    case 'task':
      return taskFabrica()
  }
}