// v2.1
// Это вторая улучшенная версия метода сортировки, универсальная

const numberFields = ['position', 'price', 'sum', 'time', 'power', 'square', 'weight', 'metall']
const stringFields = ['title', 'client', 'name', 'city', 'phone', 'typek', 'sours']
const stringFieldsNested = ['client.name']
const dateFields = ['dateCreate', 'deadline', 'dateForReady', 'dateFinish']

export const sortMethod = (array, sortUp = 'desc', sortBy = 'dateCreate') => {
  return array.sort((a, b) => {
    if (numberFields.includes(sortBy)) {
      return sortUp === 'asc' ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]

    } else if (stringFields.includes(sortBy)) {
      return sortUp === 'asc' ? a[sortBy][0].charCodeAt(0) - b[sortBy][0].charCodeAt(0) : b[sortBy][0].charCodeAt(0) - a[sortBy][0].charCodeAt(0)

    } else if (stringFieldsNested.includes(sortBy)) {
      if ((a[sortBy.split('.')[0]][sortBy.split('.')[1]]) && (b[sortBy.split('.')[0]][sortBy.split('.')[1]])) {
        return sortUp === 'asc' ? a[sortBy.split('.')[0]][sortBy.split('.')[1]][0].charCodeAt(0) - b[sortBy.split('.')[0]][sortBy.split('.')[1]][0].charCodeAt(0) : b[sortBy.split('.')[0]][sortBy.split('.')[1]][0].charCodeAt(0) - a[sortBy.split('.')[0]][sortBy.split('.')[1]][0].charCodeAt(0)
      }

    } else if (dateFields.includes(sortBy)) {
      return sortUp === 'asc' ? new Date(a[sortBy]) - new Date(b[sortBy]) : new Date(b[sortBy]) - new Date(a[sortBy])
    }
  })
}

