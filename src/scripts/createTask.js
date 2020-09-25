import getDateNow from './getDateNow'
export default (title, type = 'tasks', napravId = '', projectId = '', length = '0', napravTitle = '',
  projectTitle = '') => {
  const item = {
    title,
    desc: '',
    id: Date.now().toString(),
    type,
    napravId,
    napravTitle,
    projectId,
    projectTitle,
    status: 'todo',
    position: length + 1, // По умолчанию в конец списка
    color: '', // У задач нет цвета
    date: '',
    dateCreate: getDateNow,
    dateStart: '',
    dateDone: '',
    deadline: '',
    price: 0
  }
  return item
}