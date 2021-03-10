const messages = {
  'dus': {
    text: 'Данные успешно обновлены',
    type: 'bg-success'
  },
  'due': {
    text: 'При обновлении данных произошла ошибка',
    type: 'bg-danger'
  },
  'das': {
    text: 'Данные успешно добавлены',
    type: 'bg-success'
  },
  'dae': {
    text: 'Ошибка при добавлении данных 01',
    type: 'bg-danger'
  },
  'ris': {
    text: 'Данные успешно Удалены',
    type: 'bg-success'
  },
  'rie': {
    text: 'Ошибка при удалении данных',
    type: 'bg-danger'
  }
}

export default (code) => {
  return messages.code
}