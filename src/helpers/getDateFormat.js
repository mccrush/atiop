const getLocaleDateFromDateDigit = (date = '') => {
  let LocaleDate
  if (date) {
    LocaleDate = new Date(date)
  } else {
    return ''
  }

  LocaleDate = LocaleDate.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

  return LocaleDate
}


const getLocaleTimeFromDate = (date = '') => {
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

export { getLocaleDateFromDateDigit, getLocaleTimeFromDate }