export default (title, napravId, projectId, length) => {
  const item = {
    title,
    desc: '',
    id: Date.now().toString(),
    type: 'tasks',
    napravId,
    napravTitle: '',
    projectId,
    projectTitle: '',
    status: 'todo',
    position: length + 1, // По умолчанию в конец списка
    color: '', // У задач нет цвета
    date: '',
    deadline: '',
  }
  return item
}