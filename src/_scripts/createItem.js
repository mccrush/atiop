import getDateNow from './getDateNow'
export default (id = Date.now().toString(), title, type = 'tasks', napravId = '', projectId = '', listId = '', napravTitle = '', projectTitle = '', listTitle = '', length = 0) => {
  const item = {
    id,
    title,
    description: '',
    type,
    napravId,
    napravTitle,
    projectId,
    projectTitle,
    listId,
    listTitle,
    status: 'todo',
    position: length + 1, // По умолчанию в конец списка
    color: '', // У задач нет цвета
    date: '',
    dateCreate: getDateNow,
    dateStart: '',
    dateDone: '',
    deadline: '',
    price: 0,
    time: 0,
    sortField: 'position',
    sortDir: 'asc'
  }
  return item
}