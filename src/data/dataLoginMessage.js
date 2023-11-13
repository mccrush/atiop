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
  },
  'lee': {
    text: 'Некорректный адрес почты!',
    type: 'bg-danger'
  },
  'lpi': {
    text: 'Некорректный пароль!',
    type: 'bg-danger'
  },
  'lpw': {
    text: 'Неверный пароль!',
    type: 'bg-danger'
  },
  'lun': {
    text: 'Пользователь с такой почтой не найден',
    type: 'bg-danger'
  },
  'lue': {
    text: 'Пользователь с такой почтой уже существует',
    type: 'bg-danger'
  },
  'len': {
    text: 'Неизвестная ошибка!',
    type: 'bg-danger'
  },
  'uds': {
    text: 'Изображение успешно загружено',
    type: 'bg-success'
  },
  'ude': {
    text: 'При загрузке изображения произошла ошибка',
    type: 'bg-danger'
  },
  'dds': {
    text: 'Изображение успешно удалено',
    type: 'bg-success'
  },
  'dde': {
    text: 'При удалении изображения произошла ошибка',
    type: 'bg-danger'
  },
  'err': {
    text: 'Неизвестная ошибка. Смотри консоль',
    type: 'bg-danger'
  },
  'fin': {
    text: 'Ошибка: поля не заполнены',
    type: 'bg-danger'
  },
  'tmr': {
    text: 'Слишком много запросов!',
    type: 'bg-danger'
  },
  'null': null
}

export default (code) => {
  return messages[code]
}