import getDateNow from './getDateNow'
export default (id = Date.now().toString(), title, type = 'tasks', napravId = '', projectId = '', listId = '', length = '0', napravTitle = '', projectTitle = '', listTitle = '') => {
  const item = {
    title,
    desc: '',
    id,
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
    price: 0,
    time: 0
  }
  return item
}