export default (date = '') => {
  let newLocaleTime
  if (date) {
    newLocaleTime = new Date(date)
  } else {
    return ''
  }

  newLocaleTime = newLocaleTime.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit'
  })

  return newLocaleTime
}