export const getFormateInputDate = (date) => {
  let month = date.getMonth() + 1
  month = month < 10 ? '0' + month : month

  let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()

  return date.getFullYear() + '-' + month + '-' + day + 'T' + hours + ':' + minute
}